'use client'

import { ROUTE_PATHS } from "@/utilis/constants";
import { usePathname } from "next/navigation";
import ChatHeader from "../ChatHeader/page";
import Header from "../Header/page";

export default function HeaderWrapper ({children}: {children: React.ReactNode}) {
    const pathName = usePathname();
    const isChatPage = pathName.includes(ROUTE_PATHS.AIPOWEREDCHATBOT) || pathName.includes(ROUTE_PATHS.IMAGEGENERATION) || pathName.includes(ROUTE_PATHS.WRITTINGASSISTANT); 

    return(
        <>
          { isChatPage ? <ChatHeader /> : <Header />} 
          {children}
        </>
    )
}