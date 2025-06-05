export interface DonationLog {
  from: string;
  tokenName: string;
  value: number;
  timestamp: string;
  functionName: string;
}

export interface Donation {
  amount: bigint;
  timestamp: number;
}

export interface DonorInfo {
  walletAddress: string;
  totalDonated: bigint;
  donations: Donation[];
}

export interface DonationStats {
  totalDonated: bigint;
  donorCount: number;
  donors: DonorInfo[];
}
