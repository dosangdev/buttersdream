import { Metadata } from "next";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import firebaseApp from "@/app/utils/firebase";

// Firestore 인스턴스 생성
const db = getFirestore(firebaseApp);

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const docRef = doc(db, "butter-share", params.id);
  const docSnap = await getDoc(docRef);
  let imageUrl = "https://buttersdream.xyz/share-image.png"; // 기본 이미지
  if (docSnap.exists()) {
    imageUrl = docSnap.data().imageUrl;
  }
  return {
    title: "Open App",
    openGraph: {
      images: [imageUrl],
    },
    other: {
      "fc:frame": JSON.stringify({
        version: "next",
        imageUrl,
        button: {
          title: "Open App",
          action: {
            type: "launch_frame",
            url: "https://buttersdream.xyz/",
            name: "Butter's Dream",
            splashImageUrl: "https://buttersdream.xyz/logo.png",
            splashBackgroundColor: "#ffdfec",
          },
        },
      }),
    },
  };
}

export default function SharePage({ params }: { params: { id: string } }) {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Butter's Dream - Share</h1>
    </main>
  );
}
