import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import SessionProvider from "@/lib/session-provider";
import WalletProviderWrapper from "@/web3/WalletProvider";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VoteChain - Secure Blockchain Voting Platform",
  description: "A decentralized voting application powered by blockchain technology. Ensure transparent, secure, and tamper-proof voting with VoteChain.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} antialiased`}>
        <SessionProvider>
          <WalletProviderWrapper>
            {children}
          </WalletProviderWrapper>
        </SessionProvider>
      </body>
    </html>
  );
}
