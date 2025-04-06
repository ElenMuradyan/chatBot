import { RootState } from "@/state-management/store";
import Image from "next/image";
import { useSelector } from "react-redux";
import icon from '../../app/favicon.ico';

export default function Header () {
    return(
        <header className="flex justify-between items-center p-1 bg-black bg-opacity-90 shadow-md">
        <Image src={icon} alt="icon" width={50}/>
      
        <nav className="hidden md:flex space-x-6">
          <a href="/">Home</a>
          <a href="/functions">Functions</a>
          <a href="/about">About</a>
        </nav>
      </header>
      
    )
}