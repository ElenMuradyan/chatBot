import icon from '../../../public/favicon.png';
import Link from 'next/link'; 

export default function Header() {
    return (
        <header className="flex justify-between items-center p-1 bg-black bg-opacity-90 shadow-md">
            <img src={icon.src} alt="icon" width={50} height={50}/>
            
            <nav className="flex space-x-6">
                <Link href="/">Home</Link> 
                <Link href="/functions">Functions</Link>
                <Link href="/about">About</Link>
            </nav>
        </header>
    );
}
