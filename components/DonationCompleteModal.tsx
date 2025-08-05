"use client";

import Image from "next/image";
import { useState } from "react";

interface DonationCompleteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DonationCompleteModal({
  isOpen,
  onClose,
}: DonationCompleteModalProps) {
  const [isImageExpanded, setIsImageExpanded] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-2">
      <div className="relative bg-white rounded-xl p-6 shadow-xl text-center max-w-md w-full">
        {/* 닫기 버튼 */}
        <button
          className="absolute top-2 right-4 text-2xl text-black font-bold"
          onClick={onClose}
        >
          ×
        </button>

        {/* 제목 */}
        <div className="text-lg font-bold text-black mb-4">
          🎉 Donation Complete!
        </div>

        {/* 버터 이미지 */}
        <div className="flex max-w-md justify-center mb-4">
          <Image
            src="/donate/donation-receipt.png"
            alt="donation receipt"
            width={200}
            height={150}
            className="object-contain w-full max-w-xs cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => setIsImageExpanded(true)}
          />
        </div>

        {/* 안내 메시지 */}
        <div className="text-sm text-gray-700 mb-6 leading-relaxed">
          <p className="mb-2">
            Butter's Dream's season 1 has been successfully completed!
          </p>
          <p className="mb-2">
            Thanks to your warm hearts, many children can receive help.
          </p>
          <p>Please participate in more donation campaigns in the future! 💕</p>
        </div>

        {/* 버튼들 */}
        <div className="flex gap-3 text-sm">
          <button
            className="flex-1 bg-gray-200 text-black font-bold py-1 px-2 rounded-lg shadow-[0_2px_2px_0_rgba(0,0,0,0.25)]"
            onClick={onClose}
          >
            Close
          </button>
          <button
            className="flex-1 bg-primary text-black font-bold py-1 px-2 rounded-lg shadow-[0_2px_2px_0_rgba(0,0,0,0.25)]"
            onClick={() => {
              window.open("https://www.savethechildren.net/", "_blank");
              onClose();
            }}
          >
            Visit Donation Site
          </button>
        </div>
      </div>

      {/* 이미지 확대 모달 */}
      {isImageExpanded && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[60] px-4">
          <div className="relative max-w-4xl max-h-[90vh] w-full">
            <button
              className="absolute top-4 right-4 text-black text-3xl font-bold z-10 hover:opacity-80"
              onClick={() => setIsImageExpanded(false)}
            >
              ×
            </button>
            <Image
              src="/donate/donation-receipt.png"
              alt="donation receipt expanded"
              width={800}
              height={600}
              className="object-contain w-full h-full"
            />
          </div>
        </div>
      )}
    </div>
  );
}
