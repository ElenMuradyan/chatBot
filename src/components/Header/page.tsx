import Image from "next/image";
import icon from '../../app/favicon.ico';
import Link from 'next/link'; 

export default function Header() {
    return (
        <header className="flex justify-between items-center p-1 bg-black bg-opacity-90 shadow-md">
            <Image src={icon} alt="icon" width={50} />
            
            <nav className="flex space-x-6">
                <Link href="/">Home</Link> 
                <Link href="/functions">Functions</Link>
                <Link href="/about">About</Link>
            </nav>
        </header>
    );
}
