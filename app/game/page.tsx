"use client";

import { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import { Home, RotateCcw } from "lucide-react";
import Image from "next/image";

const TILE_VALUES = [0, 1, 2, 3, 4, 5, 6];
// const TOTAL_TIME = 180; // 3분
const TOTAL_TIME = 60; // 1분
const BOARD_SIZES = [4, 6, 8];

const BOARD_MAX_WIDTH: Record<number, string> = {
  4: "max-w-[260px]",
  6: "max-w-[390px]",
  8: "max-w-[450px]",
};

function generateBoard(boardSize: number): (number | null)[][] {
  const totalTiles = boardSize * boardSize;
  const tilePairs = Array.from(
    { length: totalTiles / 2 },
    (_, i) => TILE_VALUES[i % TILE_VALUES.length]
  );
  const mixed = [...tilePairs, ...tilePairs].sort(() => Math.random() - 0.5);
  const board: (number | null)[][] = [];
  for (let i = 0; i < boardSize; i++) {
    board.push(mixed.slice(i * boardSize, (i + 1) * boardSize));
  }
  return board;
}

const returnPath: [number, number][] = [];

function canConnect(
  board: (number | null)[][],
  start: [number, number],
  end: [number, number]
): boolean {
  const isValid = (r: number, c: number) =>
    r >= 0 &&
    r < board.length &&
    c >= 0 &&
    c < board[0].length &&
    board[r][c] === null;

  const queue: {
    pos: [number, number];
    dir: number;
    turns: number;
    path: [number, number][];
  }[] = [];
  const visited = Array.from({ length: board.length }, () =>
    Array(board[0].length).fill(Infinity)
  );

  const [sr, sc] = start;
  const [er, ec] = end;

  const dirs = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  for (let d = 0; d < 4; d++) {
    const [dr, dc] = dirs[d];
    const nr = sr + dr;
    const nc = sc + dc;
    if (isValid(nr, nc) || (nr === er && nc === ec)) {
      queue.push({
        pos: [nr, nc],
        dir: d,
        turns: 0,
        path: [
          [sr, sc],
          [nr, nc],
        ],
      });
    }
  }

  while (queue.length) {
    const {
      pos: [r, c],
      dir,
      turns,
      path,
    } = queue.shift()!;
    if (turns > 2) continue;
    if (r === er && c === ec) {
      returnPath.length = 0;
      path.forEach((p) => returnPath.push(p));
      return true;
    }
    if (visited[r][c] <= turns) continue;
    visited[r][c] = turns;

    for (let d = 0; d < 4; d++) {
      const [dr, dc] = dirs[d];
      const nr = r + dr;
      const nc = c + dc;
      if (isValid(nr, nc) || (nr === er && nc === ec)) {
        queue.push({
          pos: [nr, nc],
          dir: d,
          turns: turns + (dir === d ? 0 : 1),
          path: [...path, [nr, nc]],
        });
      }
    }
  }
  return false;
}

export default function GamePage() {
  const [boardSize, setBoardSize] = useState(4);
  const [selected, setSelected] = useState<[number, number][]>([]);
  const [path, setPath] = useState<[number, number][]>([]);
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [isGameOver, setIsGameOver] = useState(false);
  const [clearTime, setClearTime] = useState<number | null>(null);
  const [board, setBoard] = useState<(number | null)[][]>([]);
  const [matchEffect, setMatchEffect] = useState<[number, number][]>([]);
  const [shakeEffect, setShakeEffect] = useState<[number, number][]>([]);

  useEffect(() => {
    setBoard(generateBoard(boardSize));
    setSelected([]);
    setPath([]);
    setTimeLeft(TOTAL_TIME);
    setIsGameOver(false);
    setClearTime(null);
  }, [boardSize]);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          setIsGameOver(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current!);
  }, []);

  useEffect(() => {
    if (board.flat().every((tile) => tile === null) && !clearTime) {
      clearInterval(timerRef.current!);
      setClearTime(TOTAL_TIME - timeLeft);
    }
  }, [board, timeLeft, clearTime]);

  const handleSelect = (r: number, c: number) => {
    if (isGameOver || clearTime !== null || board[r][c] === null) return;

    if (selected.length === 0) {
      setSelected([[r, c]]);
    } else if (selected.length === 1) {
      const [sr, sc] = selected[0];
      if (sr === r && sc === c) return;

      if (board[sr][sc] !== board[r][c]) {
        // 매칭 실패 - 흔들림 효과
        setShakeEffect([
          [sr, sc],
          [r, c],
        ]);
        setTimeout(() => setShakeEffect([]), 500);
        setSelected([]);
        return;
      }

      if (canConnect(board, [sr, sc], [r, c])) {
        // 매칭 성공 - 파티클 효과
        setMatchEffect([
          [sr, sc],
          [r, c],
        ]);
        setTimeout(() => setMatchEffect([]), 800);

        const newBoard = board.map((row) => [...row]);
        newBoard[sr][sc] = null;
        newBoard[r][c] = null;
        setBoard(newBoard);
        setPath([...returnPath]);
        setTimeout(() => setPath([]), 300);
      }
      setSelected([]);
    }
  };

  const formatTime = (sec: number) => {
    const min = Math.floor(sec / 60);
    const s = sec % 60;
    return `${min.toString().padStart(2, "0")}.${s
      .toString()
      .padStart(2, "0")}`;
  };

  const restart = () => {
    setBoard(generateBoard(boardSize));
    setSelected([]);
    setPath([]);
    setTimeLeft(TOTAL_TIME);
    setIsGameOver(false);
    setClearTime(null);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          setIsGameOver(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <main className="flex flex-col items-center justify-center py-4">
      <div className="flex gap-2 mb-4">
        {BOARD_SIZES.map((size) => (
          <button
            key={size}
            onClick={() => setBoardSize(size)}
            className={clsx(
              "px-4 py-2 rounded font-bold border",
              boardSize === size
                ? "bg-green-400 text-white"
                : "bg-white text-black"
            )}
          >
            {size}x{size}
          </button>
        ))}
      </div>
      <div className={clsx("w-full mb-2", BOARD_MAX_WIDTH[boardSize])}>
        <div className="w-full h-3 bg-gray-300 rounded overflow-hidden">
          <div
            className="h-full bg-green-500 transition-all duration-1000"
            style={{ width: `${(timeLeft / TOTAL_TIME) * 100}%` }}
          />
        </div>
      </div>
      <div
        className={clsx("relative gap-1 w-full", BOARD_MAX_WIDTH[boardSize], {
          "grid grid-cols-4": boardSize === 4,
          "grid grid-cols-6": boardSize === 6,
          "grid grid-cols-8": boardSize === 8,
        })}
      >
        {board.map((row, rIdx) =>
          row.map((tile, cIdx) => (
            <button
              key={`${rIdx}-${cIdx}`}
              onClick={() => handleSelect(rIdx, cIdx)}
              className={clsx(
                "aspect-square w-full flex items-center justify-center rounded border text-sm sm:text-base relative z-10 transition-all duration-200",
                tile !== null ? "bg-white" : "bg-transparent",
                selected.some(([sr, sc]) => sr === rIdx && sc === cIdx) &&
                  "ring-2 ring-blue-400 scale-105",
                shakeEffect.some(([sr, sc]) => sr === rIdx && sc === cIdx) &&
                  "animate-shake",
                matchEffect.some(([sr, sc]) => sr === rIdx && sc === cIdx) &&
                  "animate-pulse scale-110"
              )}
            >
              {tile !== null &&
                (tile === 0 ? (
                  <Image
                    src="/game/butter-1.png"
                    alt="butter-1"
                    width={52}
                    height={52}
                  />
                ) : tile === 1 ? (
                  <Image
                    src="/game/butter-2.png"
                    alt="butter-2"
                    width={52}
                    height={52}
                  />
                ) : tile === 2 ? (
                  <Image
                    src="/game/butter-3.png"
                    alt="butter-3"
                    width={52}
                    height={52}
                  />
                ) : tile === 3 ? (
                  <Image
                    src="/game/butter-4.png"
                    alt="butter-4"
                    width={52}
                    height={52}
                  />
                ) : tile === 4 ? (
                  <Image
                    src="/game/butter-5.png"
                    alt="butter-5"
                    width={52}
                    height={52}
                  />
                ) : tile === 5 ? (
                  <Image
                    src="/game/butter-6.png"
                    alt="butter-6"
                    width={52}
                    height={52}
                  />
                ) : (
                  <Image
                    src="/game/butter-7.png"
                    alt="butter-7"
                    width={52}
                    height={52}
                  />
                ))}

              {/* 매칭 성공 파티클 효과 */}
              {matchEffect.some(([sr, sc]) => sr === rIdx && sc === cIdx) && (
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-0 left-0 w-2 h-2 bg-yellow-400 rounded-full animate-ping" />
                  <div
                    className="absolute top-0 right-0 w-2 h-2 bg-yellow-400 rounded-full animate-ping"
                    style={{ animationDelay: "0.1s" }}
                  />
                  <div
                    className="absolute bottom-0 left-0 w-2 h-2 bg-yellow-400 rounded-full animate-ping"
                    style={{ animationDelay: "0.2s" }}
                  />
                  <div
                    className="absolute bottom-0 right-0 w-2 h-2 bg-yellow-400 rounded-full animate-ping"
                    style={{ animationDelay: "0.3s" }}
                  />
                </div>
              )}
            </button>
          ))
        )}

        {/* 연결선 애니메이션 */}
        <svg className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
          {path.length > 1 &&
            path.map((point, i) => {
              if (i === 0) return null;
              const [x1, y1] = path[i - 1];
              const [x2, y2] = path[i];
              return (
                <line
                  key={i}
                  x1={`${((y1 + 0.5) * 100) / boardSize}%`}
                  y1={`${((x1 + 0.5) * 100) / boardSize}%`}
                  x2={`${((y2 + 0.5) * 100) / boardSize}%`}
                  y2={`${((x2 + 0.5) * 100) / boardSize}%`}
                  stroke="red"
                  strokeWidth="4"
                  strokeLinecap="round"
                  className="animate-pulse"
                />
              );
            })}
        </svg>
      </div>

      {(clearTime !== null || isGameOver) && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="relative bg-white rounded-xl p-6 shadow-xl text-center max-w-xs w-full">
            <div className="absolute -top-4 -translate-x-1/2 left-1/2 text-black rounded-3xl bg-primary border-2 border-black px-2 py-1 w-32">
              {clearTime !== null ? "Clear!" : "Game over"}
            </div>
            <div className="flex justify-center">
              <Image
                src={
                  clearTime !== null
                    ? "/game/clear-butter.png"
                    : "/game/game-over-butter.png"
                }
                alt="clear"
                width={70}
                height={70}
                style={{
                  margin: clearTime !== null ? "" : "1rem 0rem",
                }}
              />
            </div>
            {clearTime !== null && (
              <p className="text-3xl text-black font-mono mb-4">
                {formatTime(clearTime)}
              </p>
            )}
            <div className="flex justify-center gap-6 mt-4">
              <button
                onClick={() => (window.location.href = "/")}
                className="text-black flex items-center gap-2 bg-background rounded-xl px-4 py-1"
              >
                <Image
                  src="/game/game-home.png"
                  alt="home"
                  width={16}
                  height={15}
                />
                <span className="block text-base">Home</span>
              </button>
              <button
                onClick={restart}
                className="text-black flex items-center gap-2 bg-primary rounded-xl px-4 py-1"
              >
                <Image
                  src="/game/game-retry.png"
                  alt="retry"
                  width={18}
                  height={10}
                />
                <span className="block text-base">Retry</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
