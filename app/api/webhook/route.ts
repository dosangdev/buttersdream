// import { NextResponse } from "next/server";
// import {
//   ParseWebhookEvent,
//   parseWebhookEvent,
//   verifyAppKeyWithNeynar,
// } from "@farcaster/frame-node";

// // 알림 토큰을 저장할 간단한 메모리 저장소 (실제로는 데이터베이스 사용 권장)
// const notificationTokens = new Map<string, { token: string; url: string }>();

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();

//     // 웹훅 이벤트 파싱 및 검증
//     const data = await parseWebhookEvent(body, verifyAppKeyWithNeynar);

//     // 이벤트 타입에 따른 처리
//     switch (data.event) {
//       case "frame_added":
//         if (data.notificationDetails) {
//           // 사용자가 앱을 추가하고 알림을 활성화한 경우
//           const key = `${data.fid}-${data.signerRequester}`;
//           notificationTokens.set(key, {
//             token: data.notificationDetails.token,
//             url: data.notificationDetails.url,
//           });
//           console.log(`User ${data.fid} added app with notifications enabled`);
//         }
//         break;

//       case "frame_removed":
//         // 사용자가 앱을 제거한 경우
//         const removeKey = `${data.fid}-${data.signerRequester}`;
//         notificationTokens.delete(removeKey);
//         console.log(`User ${data.fid} removed app`);
//         break;

//       case "notifications_disabled":
//         // 사용자가 알림을 비활성화한 경우
//         const disableKey = `${data.fid}-${data.signerRequester}`;
//         notificationTokens.delete(disableKey);
//         console.log(`User ${data.fid} disabled notifications`);
//         break;

//       case "notifications_enabled":
//         // 사용자가 알림을 활성화한 경우
//         if (data.notificationDetails) {
//           const enableKey = `${data.fid}-${data.signerRequester}`;
//           notificationTokens.set(enableKey, {
//             token: data.notificationDetails.token,
//             url: data.notificationDetails.url,
//           });
//           console.log(`User ${data.fid} enabled notifications`);
//         }
//         break;
//     }

//     return NextResponse.json({ success: true });
//   } catch (error) {
//     console.error("Webhook error:", error);
//     return NextResponse.json(
//       { error: "Failed to process webhook" },
//       { status: 400 }
//     );
//   }
// }

// // 알림 토큰을 가져오는 헬퍼 함수
// export function getNotificationToken(fid: string, signerRequester: string) {
//   const key = `${fid}-${signerRequester}`;
//   return notificationTokens.get(key);
// }

// // 모든 알림 토큰을 가져오는 헬퍼 함수
// export function getAllNotificationTokens() {
//   return Array.from(notificationTokens.values());
// }
