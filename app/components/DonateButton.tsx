"use client";

import { useState } from "react";
import { useAccount, useWriteContract } from "wagmi";
import { parseEther } from "viem";
import { type Address } from "viem";

// USDC 컨트랙트 주소 (Base 메인넷)
const USDC_CONTRACT_ADDRESS =
  "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913" as Address;

// USDC ABI (transfer 함수만 포함)
const USDC_ABI = [
  {
    name: "transfer",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "recipient", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    outputs: [{ name: "", type: "bool" }],
  },
] as const;

export function DonateButton() {
  const { address } = useAccount();
  const [amount, setAmount] = useState<string>("");
  const [recipient, setRecipient] = useState<Address | "">("");

  const { writeContract, isPending } = useWriteContract();

  const handleDonate = async () => {
    if (!address || !amount || !recipient) return;

    try {
      // USDC는 6자리 소수점을 사용
      const amountInWei = parseEther(amount);

      await writeContract({
        address: USDC_CONTRACT_ADDRESS,
        abi: USDC_ABI,
        functionName: "transfer",
        args: [recipient, amountInWei],
      });
    } catch (error) {
      console.error("Donation failed:", error);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <input
        type="text"
        placeholder="받는 사람 주소"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value as Address)}
        className="p-2 border rounded"
      />
      <input
        type="number"
        placeholder="USDC 금액"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="p-2 border rounded"
      />
      <button
        onClick={handleDonate}
        disabled={isPending || !address || !amount || !recipient}
        className="bg-blue-500 text-white p-2 rounded disabled:bg-gray-300"
      >
        {isPending ? "전송 중..." : "USDC 전송"}
      </button>
    </div>
  );
}
