import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./Providers";
import { Inter } from "next/font/google";
import "@rainbow-me/rainbowkit/styles.css";
import LayoutWrapper from "@/components/LayoutWrapper";

export const metadata: Metadata = {
  metadataBase: new URL("https://buttersdream.xyz"),
  title: "Butter's Dream",
  description:
    "Butter's Dream is a donation-based NFT project with a mission to 'Let Butter Fly'. Buy and donate Butter Tokens to stack butter on toast and showcase collective generosity. Receive unique Butter Tower NFTs as thank-you gifts.",
  icons: {
    icon: { url: "/favicon.ico", sizes: "32x32", type: "image/x-icon" },
  },
  openGraph: {
    title: "Butter's Dream",
    description:
      "Create adorable butter characters through donations and compete in rankings with other donors. Join the movement to 'Let Butter Fly'!",
    url: "https://buttersdream.xyz",
    siteName: "Butter's Dream",
    images: [
      {
        url: "https://buttersdream.xyz/share-image.png",
        width: 1200,
        height: 630,
        alt: "Butter's Dream - Donation-based NFT Project",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Butter's Dream",
    description:
      "Create adorable butter characters through donations and compete in rankings with other donors. Join the movement to 'Let Butter Fly'!",
    images: ["https://buttersdream.xyz/share-image.png"],
    creator: "@buttersdream",
    site: "@buttersdream",
  },
  other: {
    "fc:frame": JSON.stringify({
      version: "next",
      imageUrl: "https://buttersdream.xyz/farcaster-share-image.png",
      button: {
        title: "Open App",
        action: {
          type: "launch_frame",
          url: "https://buttersdream.xyz/",
          name: "Butter's Dream",
          splashImageUrl: "https://buttersdream.xyz/butter-coin.png",
          splashBackgroundColor: "#ffdfec",
        },
      },
    }),
  },
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} w-full min-h-screen bg-background text-foreground bg-[url('/mobile-cloudes.png')] md:bg-[url('/cloudes.png')]`}
      >
        <Providers>
          <LayoutWrapper>{children}</LayoutWrapper>
        </Providers>
      </body>
    </html>
  );
  //2 4 3 1
}
