import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AuthSystem",
  description: "Modern Authentication System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body 
        className={`${inter.className} min-h-screen bg-slate-950 text-white antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
