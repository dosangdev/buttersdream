// "use client";

// import { useEffect, useState } from "react";
// import { sdk } from "@farcaster/frame-sdk";

// export default function AddMiniAppButton() {
//   const [isAdded, setIsAdded] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     // 앱이 이미 추가되었는지 확인
//     const checkIfAdded = async () => {
//       try {
//         // SDK에서 앱 추가 상태를 확인하는 방법
//         // 실제로는 다른 방법으로 확인해야 할 수 있음
//         setIsAdded(false);
//       } catch (error) {
//         console.error("Error checking if app is added:", error);
//       }
//     };

//     checkIfAdded();
//   }, []);

//   const handleAddApp = async () => {
//     setIsLoading(true);
//     try {
//       await sdk.actions.addMiniApp();
//       setIsAdded(true);
//     } catch (error) {
//       console.error("Error adding mini app:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   if (isAdded) {
//     return (
//       <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg text-sm">
//         ✅ App has been added! You can now receive notifications.
//       </div>
//     );
//   }

//   return (
//     <button
//       onClick={handleAddApp}
//       disabled={isLoading}
//       className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-medium transition-colors"
//     >
//       {isLoading ? "Adding..." : "Add to App"}
//     </button>
//   );
// }
