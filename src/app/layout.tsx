import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import { Toaster } from "sonner";
import WagmiProvider from "../components/WagmiProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "x402pay",
  description: "x402pay — web3 article payments",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased bg-white text-zinc-900`}
      >
        <WagmiProvider>
          <Toaster position="top-right" richColors />
          <Header />
          <main className="min-h-[calc(100vh-96px)]">{children}</main>
        </WagmiProvider>
      </body>
    </html>
  );
}
