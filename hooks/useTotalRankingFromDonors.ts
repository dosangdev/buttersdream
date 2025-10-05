import { useMemo } from "react";
import { donors, DonorData } from "@/data/donors";

// donors.ts 데이터를 랭킹 형태로 변환하는 타입
interface RankingDonorData extends DonorData {
  hasFarcasterData: boolean;
  farcasterUserData: {
    display_name: string;
    color: string;
    username: string;
    verifications: string[];
  };
  type: "first" | "second" | "third" | "default";
  ranking: number;
}

export function useTotalRankingFromDonors() {
  const processedData = useMemo<RankingDonorData[]>(() => {
    // 기부 금액 순으로 정렬
    const sortedDonors = [...donors].sort(
      (a, b) => b.donationAmount - a.donationAmount
    );

    // 랭킹 데이터로 변환
    return sortedDonors.map((donor, index) => ({
      ...donor,
      hasFarcasterData: true, // donors.ts에는 모든 정보가 있음
      farcasterUserData: {
        display_name: donor.nickname,
        color: donor.butterColor,
        username: donor.nickname,
        verifications: [],
      },
      type:
        index === 0
          ? "first"
          : index === 1
          ? "second"
          : index === 2
          ? "third"
          : "default",
      ranking: index + 1,
      // 기존 구조와 호환성을 위해 추가 필드
      from: donor.walletAddress,
      value: donor.donationAmount,
      timestamp: new Date().toISOString(), // 임시값
    }));
  }, []);

  // top3 추출
  const top3 = processedData.filter(
    (item) =>
      item.type === "first" || item.type === "second" || item.type === "third"
  );

  // basicCardData는 top3를 제외한 나머지 데이터
  const basicCardData = processedData.filter(
    (item) =>
      item.type !== "first" && item.type !== "second" && item.type !== "third"
  );

  return { all: processedData, top3, basicCardData };
}
