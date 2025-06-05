import ColorThief from "color-thief-browser";

/**
 * ✅ 지갑 주소에서 HEX 코드를 추출하여 RGB로 변환
 * @param walletAddress 지갑 주소 (0x로 시작)
 * @returns RGB 배열 [R, G, B]
 */
export const walletToHex = (walletAddress: string): string => {
  // `0x` 제거 후 앞 6자리 추출
  const hex = walletAddress.replace(/^0x/, "").slice(0, 6);
  console.log(hex);
  // 16진수에서 RGB로 변환

  return `#${hex}`;
};

export const rgbToHex = (r: number, g: number, b: number) => {
  return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
};

/**
 * Extract dominant color from an image URL
 * @param imageUrl URL of the image
 * @returns Promise<[number, number, number]>
 */
export const getDominantColor = async (
  imageUrl: string
): Promise<[number, number, number]> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous"; // Ensure CORS compatibility for external images
    img.src = imageUrl;

    img.onload = () => {
      try {
        const colorThief = new ColorThief();
        const dominantColor = colorThief.getColor(img) as [
          number,
          number,
          number
        ];
        resolve(dominantColor);
      } catch (error) {
        reject(new Error("Failed to extract dominant color"));
      }
    };

    img.onerror = () => {
      reject(new Error("Failed to load image"));
    };
  });
};
