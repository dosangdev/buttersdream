"use client";

import React, { useEffect } from "react";
import ClientSWRConfig from "@/app/ClientSWRConfig";
import Header from "@/components/Header";
import NavBar from "@/components/NavBar";
import { usePathname } from "next/navigation";
import { cn } from "@/app/utils/cn";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isRankingPage = pathname === "/ranking";
  const isGamePage = pathname === "/game";

  // 게임 페이지일 때 body 배경색 변경
  useEffect(() => {
    if (isGamePage) {
      document.body.style.backgroundColor = "#C1EAFF";
      document.body.style.backgroundImage = "url('/mobile-cloudes.png')";
      // md 브레이크포인트 이상에서 cloudes.png 사용
      const mediaQuery = window.matchMedia("(min-width: 28rem)");
      const updateBackground = (e: MediaQueryListEvent | MediaQueryList) => {
        document.body.style.backgroundImage = e.matches
          ? "url('/cloudes.png')"
          : "url('/mobile-cloudes.png')";
      };

      mediaQuery.addEventListener("change", updateBackground);
      updateBackground(mediaQuery);

      return () => {
        mediaQuery.removeEventListener("change", updateBackground);
      };
    } else {
      document.body.style.backgroundColor = "";
      document.body.style.backgroundImage = "url('/mobile-cloudes.png')";
      // md 브레이크포인트 이상에서 cloudes.png 사용
      const mediaQuery = window.matchMedia("(min-width: 28rem)");
      const updateBackground = (e: MediaQueryListEvent | MediaQueryList) => {
        document.body.style.backgroundImage = e.matches
          ? "url('/cloudes.png')"
          : "url('/mobile-cloudes.png')";
      };

      mediaQuery.addEventListener("change", updateBackground);
      updateBackground(mediaQuery);

      return () => {
        mediaQuery.removeEventListener("change", updateBackground);
      };
    }

    // 컴포넌트 언마운트 시 원래 스타일로 복원
    return () => {
      document.body.style.backgroundColor = "";
      document.body.style.backgroundImage = "url('/mobile-cloudes.png')";
      // md 브레이크포인트 이상에서 cloudes.png 사용
      const mediaQuery = window.matchMedia("(min-width: 28rem)");
      if (mediaQuery.matches) {
        document.body.style.backgroundImage = "url('/cloudes.png')";
      }
    };
  }, [isGamePage]);

  return (
    <div
      className={cn(
        "w-full mx-auto ",
        !isRankingPage && "max-w-md p-4 pb-16",
        isRankingPage && "w-full flex flex-col min-h-screen"
      )}
    >
      <ClientSWRConfig>
        <Header />
        <div className={cn("mb-4", isRankingPage && "flex-grow flex flex-col")}>
          {children}
        </div>
        <NavBar />
      </ClientSWRConfig>
    </div>
  );
}
