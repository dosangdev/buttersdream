"use client";

import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function NavBar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isGameActive, setIsGameActive] = useState(false);

  // 게임 페이지에서 게임 상태 확인
  useEffect(() => {
    if (pathname === "/game") {
      const checkGameState = () => {
        // body의 data-game-state 속성 확인
        const gameState = document.body.getAttribute("data-game-state");
        setIsGameActive(gameState === "playing");
      };

      // 초기 상태 확인
      checkGameState();

      // DOM 변화 감지
      const observer = new MutationObserver(checkGameState);
      observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ["data-game-state"],
      });

      return () => observer.disconnect();
    } else {
      setIsGameActive(false);
    }
  }, [pathname]);

  const handleClick = (path: string) => {
    router.push(path);
  };

  // 게임 페이지이고 게임이 활성 상태가 아니면 NavBar 숨기기
  if (pathname === "/game" && isGameActive) {
    return null;
  }

  return (
    <nav
      className={`fixed bottom-0 left-0 right-0 z-50 flex justify-between max-w-md w-full h-[70px] mx-auto bg-[url('/nav/Exclude2.png')] bg-contain sm:bg-cover  bg-center bg-no-repeat`}
    >
      <div className="flex justify-around w-full max-w-md relative text-black">
        <div
          className="cursor-pointer w-[10%] h-[47px] flex justify-center"
          onClick={() => handleClick("/")}
        >
          <Image
            src={pathname === "/" ? "/nav/home-focus.png" : "/nav/home.png"}
            alt="home image"
            className="object-contain"
            width={28}
            height={30}
            priority
          />
        </div>
        <div
          className="cursor-pointer w-[10%] h-[47px] flex items-center justify-center"
          onClick={() => handleClick("/ranking")}
        >
          <Image
            src={
              pathname === "/ranking"
                ? "/nav/ranking-focus.png"
                : "/nav/ranking.png"
            }
            alt="ranking image"
            className="object-contain"
            width={34}
            height={27}
            priority
          />
        </div>
        <div></div>

        {/* 코인 아이콘 */}
        <div className="absolute left-1/2 -translate-x-1/2 -top-8 z-10">
          <button
            onClick={() => handleClick("/tutorial")}
            className="rounded-full bg-transparent p-2 flex items-center justify-center cursor-pointer"
          >
            <Image
              src="/butter-coin.png"
              alt="coin image"
              className="object-contain"
              width={50}
              height={49}
              priority
            />
          </button>
        </div>
        <div
          className="cursor-pointer w-[10%] h-[47px] flex items-center justify-center"
          onClick={() => handleClick("/FAQ")}
        >
          <Image
            src={pathname === "/FAQ" ? "/nav/FAQ-focus.png" : "/nav/FAQ.png"}
            alt="about image"
            className="object-contain"
            width={17}
            height={31}
            priority
          />
        </div>
        <div
          className="cursor-pointer w-[10%] h-[47px] flex items-center justify-center"
          onClick={() => handleClick("/mybutter")}
        >
          <Image
            src={
              pathname === "/mybutter"
                ? "/nav/profile-focus.png"
                : "/nav/profile.png"
            }
            alt="profile image"
            className="object-contain"
            width={27}
            height={22}
            priority
          />
        </div>
      </div>
    </nav>
  );
}
