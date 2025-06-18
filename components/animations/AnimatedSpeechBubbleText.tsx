"use client";

import { motion, AnimatePresence } from "framer-motion";

interface AnimatedSpeechBubbleTextProps {
  text: string;
  className?: string;
}

export default function AnimatedSpeechBubbleText({
  text,
  className = "",
}: AnimatedSpeechBubbleTextProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.p
        key={text}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{
          opacity: 1,
          scale: [0.5, 1], // 작은 크기 -> 약간 큰 크기 -> 원래 크기
        }}
        transition={{
          duration: 0.2, // 전체 시간 단축
          times: [0, 1], // 타이밍 조정
          ease: "easeOut",
        }}
        className={className}
      >
        {text}
      </motion.p>
    </AnimatePresence>
  );
}
