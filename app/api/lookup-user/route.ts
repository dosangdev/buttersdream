import ky from "ky";
import { NextResponse } from "next/server";

type UserData = {
  fid: number;
  username: string;
  display_name: string;
  pfp_url: string;
  custody_address: string;
  follower_count: number;
  following_count: number;
  power_badge: boolean;
  profile: {
    bio: Record<string, any>;
  };
  verifications: string[];
  verified_accounts: any[];
  verified_addresses: Record<string, any>;
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const walletAddress = searchParams.get("walletAddress");
    const walletAddresses = searchParams.get("walletAddresses"); // 여러 주소를 쉼표로 구분

    if (!walletAddress && !walletAddresses) {
      return NextResponse.json(
        { message: "Wallet address is required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.NEYNAR_API_KEY;

    // 여러 주소가 있으면 bulk API 사용, 없으면 단일 주소 사용
    const addresses = walletAddresses || walletAddress;

    const response = await ky.get(
      `https://api.neynar.com/v2/farcaster/user/bulk-by-address?addresses=${addresses}`,
      {
        headers: {
          accept: "application/json",
          api_key: apiKey!,
        },
      }
    );

    const data = await response.json();

    // 단일 주소인 경우 첫 번째 결과만 반환, 여러 주소인 경우 전체 반환
    if (walletAddress && !walletAddresses) {
      const userData = Object.values(data || {})[0] as UserData;

      return NextResponse.json(userData);
    } else {
      return NextResponse.json(data);
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch user data" },
      { status: 500 }
    );
  }
}
