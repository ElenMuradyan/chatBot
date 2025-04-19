'use client'

import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/Header/page";
import { store } from "@/state-management/store";
import { Provider } from "react-redux";
import { usePathname } from "next/navigation";
import { ROUTE_PATHS } from "@/utilis/constants";
import ChatHeader from "@/components/ChatHeader/page";

import "./globals.css";
import MainLoader from "@/components/LoadingWrapper/page";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathName = usePathname();
  const isChatPage = pathName.includes(ROUTE_PATHS.AIPOWEREDCHATBOT) || pathName.includes(ROUTE_PATHS.IMAGEGENERATION) || pathName.includes(ROUTE_PATHS.WRITTINGASSISTANT); 

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider store={store}>
          <MainLoader>
          { isChatPage ? <ChatHeader /> : <Header />} 
          {children}
          </MainLoader>
        </Provider>
      </body>
    </html>
  );
}