import { DonationLog, DonorInfo, DonationStats } from "../types/donation";

const MIN_DONATION_AMOUNT = BigInt(100000); // 0.1 USDC (6 decimals)
const DONATION_WALLET = "0xc683f61bfe08bfccde53a41f4607b4a1b72954db";

export function processDonationLogs(logs: any[]): DonationLog[] {
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

      return {
        from,
        tokenName,
        value: Number(BigInt(value)) / 1000000, // USDC 단위로 변환 (6 decimals)
        timestamp: new Date(parseInt(timeStamp) * 1000)
          .toISOString()
          .split("T")[0],
        functionName,
      };
    })
    .filter((log): log is DonationLog => log !== null);
}

// export function aggregateDonations(logs: DonationLog[]): DonationStats {
//   const donorMap = new Map<string, DonorInfo>();

//   logs.forEach((log) => {
//     if (log.value < MIN_DONATION_AMOUNT) return;

//     const existingDonor = donorMap.get(log.from);
//     if (existingDonor) {
//       existingDonor.totalDonated += log.value;
//       existingDonor.donations.push({
//         amount: log.value,
//         timestamp: log.timestamp,
//         transactionHash: log.functionName,
//       });
//     } else {
//       donorMap.set(log.from, {
//         walletAddress: log.from,
//         totalDonated: log.value,
//         donations: [
//           {
//             amount: log.value,
//             timestamp: log.timestamp,
//             transactionHash: log.functionName,
//           },
//         ],
//       });
//     }
//   });

//   const donors = Array.from(donorMap.values());
//   const totalDonated = donors.reduce(
//     (sum, donor) => sum + donor.totalDonated,
//     0n
//   );

//   return {
//     totalDonated,
//     donorCount: donors.length,
//     donors,
//   };
// }

// export function getDonorStats(
//   walletAddress: string,
//   logs: DonationLog[]
// ): DonorInfo | null {
//   const donorLogs = logs.filter((log) => log.from === walletAddress);
//   if (donorLogs.length === 0) return null;

//   return {
//     walletAddress,
//     totalDonated: donorLogs.reduce((sum, log) => sum + log.value, 0n),
//     donations: donorLogs.map((log) => ({
//       amount: log.value,
//       timestamp: log.timestamp,
//       transactionHash: log.functionName,
//     })),
//   };
// }

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
