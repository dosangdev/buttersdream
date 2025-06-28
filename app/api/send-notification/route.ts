// import { NextResponse } from "next/server";
// import { getAllNotificationTokens } from "../webhook/route";

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const { notificationId, title, body: messageBody, targetUrl } = body;

//     // 필수 필드 검증
//     if (!notificationId || !title || !messageBody || !targetUrl) {
//       return NextResponse.json(
//         { error: "Missing required fields" },
//         { status: 400 }
//       );
//     }

//     // 저장된 모든 알림 토큰 가져오기
//     const tokens = getAllNotificationTokens();

//     if (tokens.length === 0) {
//       return NextResponse.json(
//         { message: "No users with notifications enabled" },
//         { status: 200 }
//       );
//     }

//     // 알림 전송 결과를 추적할 배열
//     const successfulTokens: string[] = [];
//     const invalidTokens: string[] = [];
//     const rateLimitedTokens: string[] = [];

//     // 각 토큰에 대해 알림 전송
//     for (const { token, url } of tokens) {
//       try {
//         const response = await fetch(url, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             notificationId,
//             title,
//             body: messageBody,
//             targetUrl,
//             tokens: [token],
//           }),
//         });

//         if (response.ok) {
//           const result = await response.json();
//           successfulTokens.push(...(result.successfulTokens || []));
//           invalidTokens.push(...(result.invalidTokens || []));
//           rateLimitedTokens.push(...(result.rateLimitedTokens || []));
//         } else {
//           console.error(
//             `Failed to send notification to ${url}: ${response.status}`
//           );
//         }
//       } catch (error) {
//         console.error(`Error sending notification to ${url}:`, error);
//       }
//     }

//     return NextResponse.json({
//       success: true,
//       successfulTokens,
//       invalidTokens,
//       rateLimitedTokens,
//       totalSent: successfulTokens.length,
//     });
//   } catch (error) {
//     console.error("Send notification error:", error);
//     return NextResponse.json(
//       { error: "Failed to send notifications" },
//       { status: 500 }
//     );
//   }
// }
