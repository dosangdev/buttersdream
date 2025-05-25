import { useState, useEffect } from "react";

const DONATION_WALLET_ADDRESS = "YOUR_WALLET_ADDRESS"; // 실제 지갑 주소로 변경 필요
const TARGET_AMOUNT = 200; // USDC

export function useDonationProgress() {
  const [currentAmount, setCurrentAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDonationAmount() {
      try {
        setIsLoading(true);
        // TODO: 실제 블록체인에서 데이터를 가져오는 로직 구현
        // 예시: const amount = await getDonationAmount(DONATION_WALLET_ADDRESS);
        // setCurrentAmount(amount);

        // 테스트용 더미 데이터
        setCurrentAmount(100); // 35% 진행률을 보여주기 위한 임시 값
      } catch (err) {
        setError("Failed to fetch donation amount");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchDonationAmount();

    // 실시간 업데이트를 위한 인터벌 설정
    const interval = setInterval(fetchDonationAmount, 30000); // 30초마다 업데이트

    return () => clearInterval(interval);
  }, []);

  return {
    currentAmount,
    targetAmount: TARGET_AMOUNT,
    isLoading,
    error,
    percentage: (currentAmount / TARGET_AMOUNT) * 100,
  };
}
