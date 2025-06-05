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

    if (!walletAddress) {
      return NextResponse.json(
        { message: "Wallet address is required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.NEYNAR_API_KEY;
    const response = await ky.get(
      `https://api.neynar.com/v2/farcaster/user/bulk-by-address?addresses=${walletAddress}`,
      {
        headers: {
          accept: "application/json",
          api_key: apiKey!,
        },
      }
    );

    const data = await response.json();
    const userData = Object.values(data || {})[0] as UserData;

    return NextResponse.json(userData);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch user data" },
      { status: 500 }
    );
  }
}
