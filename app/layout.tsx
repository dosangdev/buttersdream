import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./Providers";
import { Inter } from "next/font/google";
import "@rainbow-me/rainbowkit/styles.css";
import LayoutWrapper from "@/components/LayoutWrapper";

export const metadata: Metadata = {
  title: "Butter's Dream",
  description:
    "Butter's Dream is a donation-based NFT project with a mission to 'Let Butter Fly'. Buy and donate Butter Tokens to stack butter on toast and showcase collective generosity. Receive unique Butter Tower NFTs as thank-you gifts.",
  icons: {
    icon: { url: "/favicon.ico", sizes: "32x32", type: "image/x-icon" },
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
        className={`${inter.variable} w-full min-h-screen bg-background text-foreground  bg-[url('/cloudes.png')] bg-cover animate-moveBackground`}
      >
        <Providers>
          <LayoutWrapper>{children}</LayoutWrapper>
        </Providers>
      </body>
    </html>
  );
  //2 4 3 1
}
