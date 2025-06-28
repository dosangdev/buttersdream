import { DonationLog, DonorInfo, DonationStats } from "../types/donation";

const MIN_DONATION_AMOUNT = BigInt(100000); // 0.1 USDC (6 decimals)
const DONATION_WALLET = "0xc683f61bfe08bfccde53a41f4607b4a1b72954db";

export function processDonationLogs(logs: any[]): DonationLog[] {
  const deadline = new Date(Date.UTC(2025, 7, 1, 0, 0, 0)); // 2025-08-01T00:00:00Z
  return logs
    .map((log) => {
      const { from, tokenName, to, value, timeStamp, functionName } = log;

      // USDC 토큰인지 확인
      if (tokenName !== "USDC") {
        return null;
      }

      // to가 0xc683F61BFE08bfcCde53A41f4607B4A1B72954Db인지 확인
      if (to !== DONATION_WALLET) {
        return null;
      }

      // transfer 함수인지 확인
      if (functionName !== "transfer(address recipient,uint256 amount)") {
        return null;
      }

      // 최소 기부 금액 확인 (0.1 USDC)
      if (BigInt(value) < MIN_DONATION_AMOUNT) {
        return null;
      }

      // 2025년 8월 1일(UTC) 미만인지 확인
      const logDate = new Date(parseInt(timeStamp) * 1000);
      if (logDate >= deadline) {
        return null;
      }

      return {
        from,
        tokenName,
        value: Number(BigInt(value)) / 1000000, // USDC 단위로 변환 (6 decimals)
        timestamp: logDate.toISOString().split("T")[0],
        functionName,
      };
    })
    .filter((log): log is DonationLog => log !== null);
}

// 지갑별로 기부 내역을 합산하는 함수
export function getDonateLogTotal(logs: DonationLog[]): DonationLog[] {
  const totalMap = new Map<string, DonationLog>();

  logs.forEach((log) => {
    const existing = totalMap.get(log.from);
    if (existing) {
      existing.value = Number((existing.value + log.value).toFixed(2));
    } else {
      totalMap.set(log.from, { ...log });
    }
  });

  return Array.from(totalMap.values());
}
