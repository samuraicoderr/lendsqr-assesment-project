import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import * as _meta from "./meta";
import '@/styles/global.scss';
import { AuthProviderClient } from "@/lib/api/auth/AuthProviderClient";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = _meta.metadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <AuthProviderClient>{children}</AuthProviderClient>
      </body>
    </html>
  );
}
