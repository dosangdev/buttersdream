"use client";

import { usePathname } from "next/navigation";
import { useAnimationStore } from "@/store/animationStore";
import { useEffect } from "react";

export default function BackgroundController() {
  const pathname = usePathname();
  const isCreationPage = pathname === "/donate";
  const { isInitialAnimation, setInitialAnimation } = useAnimationStore();

  useEffect(() => {
    if (isCreationPage) {
      setInitialAnimation(true);
      const timer = setTimeout(() => {
        setInitialAnimation(false);
      }, 3500);

      return () => clearTimeout(timer);
    }
  }, [isCreationPage, setInitialAnimation]);

  useEffect(() => {
    const body = document.body;
    const baseClasses =
      "w-full min-h-screen bg-background text-foreground bg-[url('/mobile-cloudes.png')] md:bg-[url('/cloudes.png')] bg-cover";
    const animationClass =
      isInitialAnimation && isCreationPage
        ? "animate-initialBackgroundMove"
        : "animate-moveBackground";

    body.className = `${baseClasses} ${animationClass}`;

    return () => {
      body.className = baseClasses;
    };
  }, [isInitialAnimation, isCreationPage]);

  return null;
}
