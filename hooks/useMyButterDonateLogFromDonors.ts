import { useMemo } from "react";
import { donors, DonorData } from "@/data/donors";
import { useAccount } from "wagmi";

// donors.ts 데이터를 MyButter 형태로 변환하는 타입
interface MyButterDonationData extends DonorData {
  hasFarcasterData: boolean;
  farcasterUserData: {
    display_name: string;
    color: string;
    username: string;
    verifications: string[];
  };
  // 기존 구조와 호환성을 위해 추가 필드
  from: string;
  value: number;
  timestamp: string;
  functionName: string;
  hash: string;
}

export function useMyButterDonateLogFromDonors() {
  const { address } = useAccount();

  const { myDonationLogs, totalValue } = useMemo(() => {
    if (!address) {
      return { myDonationLogs: [], totalValue: 0 };
    }

    // 연결된 지갑 주소와 일치하는 기부자 찾기
    const myDonorData = donors.find(
      (donor) => donor.walletAddress.toLowerCase() === address.toLowerCase()
    );

    if (!myDonorData) {
      return { myDonationLogs: [], totalValue: 0 };
    }

    // MyButter 형태로 변환
    const myDonationData: MyButterDonationData = {
      ...myDonorData,
      hasFarcasterData: true,
      farcasterUserData: {
        display_name: myDonorData.nickname,
        color: myDonorData.butterColor,
        username: myDonorData.nickname,
        verifications: [],
      },
      // 기존 구조와 호환성을 위해 추가 필드
      from: myDonorData.walletAddress,
      value: myDonorData.donationAmount,
      timestamp: new Date().toISOString().split("T")[0], // 임시값
      functionName: "transfer",
      hash: `0x${Math.random().toString(16).substr(2, 64)}`, // 임시 해시값
    };

    return {
      myDonationLogs: [myDonationData],
      totalValue: myDonorData.donationAmount,
    };
  }, [address]);

  return { myDonationLogs, totalValue };
}
