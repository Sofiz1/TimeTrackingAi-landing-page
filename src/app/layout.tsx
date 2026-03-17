import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({ 
  subsets: ["latin"],
  variable: '--font-outfit',
  weight: ['300', '400', '600', '700']
});

export const metadata: Metadata = {
  title: "TimeTrackingAI | Precision Productivity for Windows",
  description: "Unlock your productivity with TimeTrackingAI. AI-powered insights, secure local tracking, and a premium Windows 11 experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
