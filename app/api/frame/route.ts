import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { untrustedData } = body;

  // 여기서 Frame 버튼 클릭에 대한 로직을 처리할 수 있습니다
  // 예: 데이터베이스에 저장, 다른 API 호출 등

  return NextResponse.json({
    success: true,
    message: "Frame action processed successfully",
  });
}
