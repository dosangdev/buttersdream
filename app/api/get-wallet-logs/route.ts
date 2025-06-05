import { NextResponse } from "next/server";
import ky from "ky";

export async function GET() {
  try {
    const apikey = process.env.BASESCAN_API_KEY;

    // 토큰 전송 내역 가져오기
    const response = await ky.get(`https://api.basescan.org/api
?module=account
&action=tokentx
&address=0xc683F61BFE08bfcCde53A41f4607B4A1B72954Db
&page=1
&offset=1000
&apikey=${apikey}`);

    const data = await response.json();
    return NextResponse.json(data);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to fetch wallet logs" },
      { status: 500 }
    );
  }
}
