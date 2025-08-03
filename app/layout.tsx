import type { Metadata } from "next";
import "./globals.css";
import NextAuthSession from "@/components/NextAuthSession";
import { ReduxProvider } from "@/components/ReduxProvider";
import { Inter } from 'next/font/google';

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"]
})


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
