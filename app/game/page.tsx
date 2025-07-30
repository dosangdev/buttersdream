"use client";

import { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import { Home, RotateCcw } from "lucide-react";
import Image from "next/image";

const TILE_VALUES = [0, 1, 2, 3, 4, 5, 6];
const BOARD_SIZES = [4, 6, 8];

// 보드 크기별 시간 제한
const TIME_LIMITS: Record<number, number> = {
  4: 30, // 4x4: 30초
  6: 45, // 6x6: 45초
  8: 60, // 8x8: 60초
};

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
  const [timeLeft, setTimeLeft] = useState(TIME_LIMITS[boardSize]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [clearTime, setClearTime] = useState<number | null>(null);
  const [board, setBoard] = useState<(number | null)[][]>([]);
  const [matchEffect, setMatchEffect] = useState<[number, number][]>([]);
  const [shakeEffect, setShakeEffect] = useState<[number, number][]>([]);
  const [showStartModal, setShowStartModal] = useState(true);
  const [startModalImage, setStartModalImage] = useState<string>("");

  // 아이템 사용 횟수 추적
  const [shuffleCount, setShuffleCount] = useState(0);
  const [timeAddCount, setTimeAddCount] = useState(0);
  const [boostCount, setBoostCount] = useState(0);

  // 초기 로딩 시에만 모달을 띄움
  useEffect(() => {
    setShowStartModal(true);
    setStartModalImage(
      Math.random() < 0.5
        ? "https://res.cloudinary.com/djxepunc8/image/upload/v1752658657/game-angry-butter_wcvbt9.png"
        : "https://res.cloudinary.com/djxepunc8/image/upload/v1752658665/game-smile-butter_gjeytr.png"
    );
    // 게임 시작 전 상태 설정
    document.body.setAttribute("data-game-state", "modal");

    // 컴포넌트 언마운트 시 정리
    return () => {
      document.body.removeAttribute("data-game-state");
    };
  }, []);

  useEffect(() => {
    setBoard(generateBoard(boardSize));
    setSelected([]);
    setPath([]);
    setTimeLeft(TIME_LIMITS[boardSize]);
    setIsGameOver(false);
    setClearTime(null);
    // 아이템 사용 횟수 초기화
    setShuffleCount(0);
    setTimeAddCount(0);
    setBoostCount(0);
  }, [boardSize]);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (showStartModal) return; // 시작 모달이 보이는 동안은 타이머 시작하지 않음

    // 게임 시작 상태 설정
    document.body.setAttribute("data-game-state", "playing");

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          setIsGameOver(true);
          // 게임 오버 상태 설정
          document.body.setAttribute("data-game-state", "modal");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current!);
  }, [showStartModal]);

  useEffect(() => {
    // 게임이 시작되고 보드가 비어있을 때만 클리어 처리
    if (
      timeLeft < TIME_LIMITS[boardSize] &&
      board.flat().every((tile) => tile === null) &&
      !clearTime
    ) {
      clearInterval(timerRef.current!);
      setClearTime(TIME_LIMITS[boardSize] - timeLeft);
      // 게임 클리어 상태 설정
      document.body.setAttribute("data-game-state", "modal");
    }
  }, [board, timeLeft, clearTime, boardSize]);

  const handleSelect = (r: number, c: number) => {
    if (
      showStartModal ||
      isGameOver ||
      clearTime !== null ||
      board[r][c] === null
    )
      return;

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

  const startGame = () => {
    setShowStartModal(false);
  };

  const restart = () => {
    setBoard(generateBoard(boardSize));
    setSelected([]);
    setPath([]);
    setTimeLeft(TIME_LIMITS[boardSize]);
    setIsGameOver(false);
    setClearTime(null);
    setShowStartModal(false);
    // 아이템 사용 횟수 초기화
    setShuffleCount(0);
    setTimeAddCount(0);
    setBoostCount(0);
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

  // 카드 섞기 기능
  const shuffleBoard = () => {
    if (showStartModal || isGameOver || clearTime !== null) return;
    if (shuffleCount >= 2) return; // 최대 2번만 사용 가능

    // 현재 보드에서 null이 아닌 값들만 추출
    const remainingCards = board.flat().filter((tile) => tile !== null);

    if (remainingCards.length === 0) return; // 섞을 카드가 없으면 리턴

    // 카드들을 무작위로 섞기
    const shuffledCards = [...remainingCards].sort(() => Math.random() - 0.5);

    // 새로운 보드 생성
    const newBoard = board.map((row) => [...row]);
    let cardIndex = 0;

    // 기존 카드 위치에 섞인 카드들을 배치
    for (let r = 0; r < boardSize; r++) {
      for (let c = 0; c < boardSize; c++) {
        if (newBoard[r][c] !== null) {
          newBoard[r][c] = shuffledCards[cardIndex++];
        }
      }
    }

    setBoard(newBoard);
    setSelected([]); // 선택된 카드 초기화
    setPath([]); // 경로 초기화
    setShuffleCount((prev) => prev + 1); // 사용 횟수 증가
  };

  // 시간 10초 추가 기능
  const addTime = () => {
    if (showStartModal || isGameOver || clearTime !== null) return;
    if (timeAddCount >= 1) return; // 최대 1번만 사용 가능

    setTimeLeft((prev) => prev + 10);
    setTimeAddCount((prev) => prev + 1); // 사용 횟수 증가
  };

  // 랜덤으로 카드 1세트 제거 기능
  const removeRandomSet = () => {
    if (showStartModal || isGameOver || clearTime !== null) return;
    if (boostCount >= 1) return; // 최대 1번만 사용 가능

    // 현재 보드에서 null이 아닌 값들만 추출
    const remainingCards = board.flat().filter((tile) => tile !== null);

    if (remainingCards.length === 0) return; // 제거할 카드가 없으면 리턴

    // 각 카드 타입별로 개수 세기
    const cardCounts = new Map<number, number>();
    remainingCards.forEach((card) => {
      cardCounts.set(card, (cardCounts.get(card) || 0) + 1);
    });

    // 2개 이상 있는 카드 타입들 찾기
    const availableSets = Array.from(cardCounts.entries())
      .filter(([_, count]) => count >= 2)
      .map(([cardType, _]) => cardType);

    if (availableSets.length === 0) return; // 제거할 세트가 없으면 리턴

    // 랜덤으로 하나의 카드 타입 선택
    const randomCardType =
      availableSets[Math.floor(Math.random() * availableSets.length)];

    // 새로운 보드 생성
    const newBoard = board.map((row) => [...row]);
    let removedCount = 0;
    const removedPositions: [number, number][] = [];

    // 선택된 카드 타입의 첫 번째 2개를 제거
    for (let r = 0; r < boardSize; r++) {
      for (let c = 0; c < boardSize; c++) {
        if (newBoard[r][c] === randomCardType && removedCount < 2) {
          removedPositions.push([r, c]);
          newBoard[r][c] = null;
          removedCount++;
        }
      }
    }

    setBoard(newBoard);
    setSelected([]); // 선택된 카드 초기화
    setPath([]); // 경로 초기화

    // 매칭 성공 효과 표시 (파티클 효과)
    setMatchEffect(removedPositions);
    setTimeout(() => setMatchEffect([]), 800);
    setBoostCount((prev) => prev + 1); // 사용 횟수 증가
  };

  return (
    <main className="flex flex-col items-center justify-center py-4">
      <div className={clsx("w-full mb-2", BOARD_MAX_WIDTH[boardSize])}>
        <div className="w-full h-3 bg-gray-300 rounded relative">
          <div
            className="h-full bg-primary transition-all duration-1000 border-2 border-black rounded"
            style={{ width: `${(timeLeft / TIME_LIMITS[boardSize]) * 100}%` }}
          />
          <Image
            src="/butterfly-basic.png"
            width={38}
            height={26}
            alt="butterfly"
            className="absolute top-1/2 z-10"
            style={{
              left: `calc(${
                (timeLeft / TIME_LIMITS[boardSize]) * 100
              }% - 19px)`,
              transform: "translateY(-50%)",
              animation: "wiggle 1s ease-in-out infinite",
            }}
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
                "w-full flex items-center justify-center rounded text-sm sm:text-base relative z-10 transition-all duration-200",
                boardSize === 4 && "h-[69.47px]",
                boardSize === 6 && "h-[69.47px]",
                boardSize === 8 && "aspect-square",
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
                    src="https://res.cloudinary.com/djxepunc8/image/upload/v1752658655/butter-1_mz6liq.png"
                    alt="butter-1"
                    width={52}
                    height={52}
                  />
                ) : tile === 1 ? (
                  <Image
                    src="https://res.cloudinary.com/djxepunc8/image/upload/v1752658659/butter-2_m6ocpw.png"
                    alt="butter-2"
                    width={52}
                    height={52}
                  />
                ) : tile === 2 ? (
                  <Image
                    src="https://res.cloudinary.com/djxepunc8/image/upload/v1752658655/butter-3_mt08pe.png"
                    alt="butter-3"
                    width={52}
                    height={52}
                  />
                ) : tile === 3 ? (
                  <Image
                    src="https://res.cloudinary.com/djxepunc8/image/upload/v1752658656/butter-4_zniabr.png"
                    alt="butter-4"
                    width={52}
                    height={52}
                  />
                ) : tile === 4 ? (
                  <Image
                    src="https://res.cloudinary.com/djxepunc8/image/upload/v1752658657/butter-5_sfdxxi.png"
                    alt="butter-5"
                    width={52}
                    height={52}
                  />
                ) : tile === 5 ? (
                  <Image
                    src="https://res.cloudinary.com/djxepunc8/image/upload/v1752658659/butter-6_kbahlb.png"
                    alt="butter-6"
                    width={52}
                    height={52}
                  />
                ) : (
                  <Image
                    src="https://res.cloudinary.com/djxepunc8/image/upload/v1752658655/butter-7_olbtww.png"
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

      {/* 버튼들을 게임 보드 밖으로 이동 */}
      <div className="w-full flex gap-2 justify-center items-center mt-4">
        <button onClick={shuffleBoard}>
          <div className="relative">
            <Image
              src={
                shuffleCount < 2
                  ? "https://res.cloudinary.com/djxepunc8/image/upload/v1752658659/mix-icon_xkwpxf.png"
                  : "https://res.cloudinary.com/djxepunc8/image/upload/v1752658659/mix-used_dat0tx.png"
              }
              width={49}
              height={49}
              alt="mix"
            />
            {shuffleCount < 2 && (
              <Image
                src={
                  shuffleCount === 0
                    ? "https://res.cloudinary.com/djxepunc8/image/upload/v1752658658/mix-2_lpm4tb.png"
                    : "https://res.cloudinary.com/djxepunc8/image/upload/v1752658658/mix-1_tltmzc.png"
                }
                width={10}
                height={15}
                alt="mix-1"
                className="absolute bottom-1 left-1/2 -translate-x-1/2"
              />
            )}
          </div>
        </button>
        <button onClick={addTime}>
          <Image
            src={
              timeAddCount >= 1
                ? "https://res.cloudinary.com/djxepunc8/image/upload/v1752658659/time-used_rv2z5a.png"
                : "https://res.cloudinary.com/djxepunc8/image/upload/v1752658660/time_wobcab.png"
            }
            width={49}
            height={49}
            alt="time"
          />
        </button>
        <button onClick={removeRandomSet}>
          <Image
            src={
              boostCount >= 1
                ? "https://res.cloudinary.com/djxepunc8/image/upload/v1752658653/boost-used_hkeovi.png"
                : "https://res.cloudinary.com/djxepunc8/image/upload/v1752658653/boost_z44gh1.png"
            }
            width={49}
            height={49}
            alt="boost"
          />
        </button>
      </div>

      {/* 통합 모달 */}
      {(showStartModal || clearTime !== null || isGameOver) && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="relative bg-white rounded-xl p-6 shadow-xl text-center max-w-xs w-full">
            <div className="absolute -top-4 -translate-x-1/2 left-1/2 text-black rounded-3xl bg-primary border-2 border-black px-2 py-1 w-32">
              {showStartModal
                ? "Start!"
                : clearTime !== null
                ? "Clear!"
                : "Game over"}
            </div>
            <div className="flex justify-center">
              <Image
                src={
                  showStartModal
                    ? startModalImage
                    : clearTime !== null
                    ? "https://res.cloudinary.com/djxepunc8/image/upload/v1752658654/clear-butter_ochelc.png"
                    : "https://res.cloudinary.com/djxepunc8/image/upload/v1752658658/game-over-butter_wgn958.png"
                }
                alt="modal"
                width={70}
                height={70}
                style={{
                  margin: clearTime !== null ? "1rem 0rem" : "1rem 0rem",
                }}
              />
            </div>
            {!showStartModal && clearTime !== null && (
              <p className="text-3xl text-black font-mono mb-4">
                {formatTime(clearTime)}
              </p>
            )}
            <div className="flex justify-center gap-6 mt-4">
              {showStartModal ? (
                // 시작 모달 버튼들
                <div className="flex gap-2 text-black">
                  {BOARD_SIZES.map((size) => (
                    <button
                      key={size}
                      className="block bg-primary rounded-lg px-4 py-1 cursor-pointer"
                      onClick={() => {
                        setBoardSize(size);
                        setShowStartModal(false);
                      }}
                    >
                      {size}*{size}
                    </button>
                  ))}
                </div>
              ) : (
                <>
                  <button
                    onClick={() => setShowStartModal(true)}
                    className="text-black flex items-center gap-2 bg-[#DDF3FF] rounded-xl px-4 py-1"
                  >
                    <Image
                      src="https://res.cloudinary.com/djxepunc8/image/upload/v1752658657/game-home_p5vuyq.png"
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
                      src="https://res.cloudinary.com/djxepunc8/image/upload/v1752658658/game-retry_lyvryi.png"
                      alt="retry"
                      width={18}
                      height={10}
                    />
                    <span className="block text-base">Retry</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
