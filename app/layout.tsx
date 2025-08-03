import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import NextAuthSession from "@/components/NextAuthSession";
import { ReduxProvider } from "@/components/ReduxProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"]
})

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Inventory App",
  description: "Inventory Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable}  antialiased`}
      >
        <ReduxProvider>
        <NextAuthSession>
          
            {children}
        </NextAuthSession>
        </ReduxProvider>
          
        
        
      </body>
    </html>
  );
}
