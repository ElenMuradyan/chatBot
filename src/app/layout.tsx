import { Geist, Geist_Mono } from "next/font/google";
import logo from '../../public/favicon.png';
import { Metadata } from "next";
import Wrappers from "@/components/Wrapers/page";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Z-ChatBot",
  description: "All your answers here",
  icons: {
    icon: logo.src
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Wrappers>
        {children}
        </Wrappers>
      </body>
    </html>
  );
}