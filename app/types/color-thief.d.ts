declare module "color-thief-browser" {
  export default class ColorThief {
    /**
     * 이미지에서 가장 지배적인 색상을 추출합니다.
     * @param img HTMLImageElement - 분석할 이미지 요소
     * @returns [number, number, number] - RGB 색상 값 배열
     */
    getColor(img: HTMLImageElement): [number, number, number];

    /**
     * 이미지에서 색상 팔레트를 추출합니다.
     * @param img HTMLImageElement - 분석할 이미지 요소
     * @param colorCount number - 추출할 색상 수 (기본값: 10)
     * @returns Array<[number, number, number]> - RGB 색상 값 배열의 배열
     */
    getPalette(
      img: HTMLImageElement,
      colorCount?: number
    ): Array<[number, number, number]>;
  }
}
