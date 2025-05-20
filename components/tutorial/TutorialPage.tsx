"use client";

import { useState } from "react";
import Image from "next/image";

interface TutorialPageProps {
  image: string;
  title: string;
  description: string;
  isLast?: boolean;
  onNext: () => void;
  onPrev: () => void;
  speechText: {
    fontSize: string;
    lineHeight: string;
    text: string;
  };
}

export default function TutorialPage({
  image,
  title,
  description,
  isLast = false,
  onNext,
  onPrev,
  speechText,
}: TutorialPageProps) {
  return (
    <div className="flex flex-col items-center w-full max-w-md">
      <div className="relative mb-[11px]">
        <Image
          //   src="/tutorial/tutorial-speech-bubble.png"
          src="/tutorial/eee.png"
          width={358}
          //   height={94}
          height={105}
          alt="tutorial speech bubble Image"
          className="object-contain"
          priority
        />
        <p
          className={`absolute inset-0 flex items-center justify-center text-black text-center pt-[20px] pb-[28px]  ${speechText.fontSize}  whitespace-pre-line`}
        >
          {speechText.text}
        </p>
      </div>
      <div className=" aspect-square mb-6">
        <Image
          src={image}
          alt={title}
          width={100}
          height={75}
          className="object-contain"
          priority
        />
      </div>

      <div className="flex justify-between w-full">
        <button onClick={onPrev} className="px-6 py-2 text-sm text-gray-600">
          이전
        </button>
        <button
          onClick={onNext}
          className="px-6 py-2 bg-[#FFD700] rounded-full text-sm font-medium"
        >
          {isLast ? "시작하기" : "다음"}
        </button>
      </div>
    </div>
  );
}
