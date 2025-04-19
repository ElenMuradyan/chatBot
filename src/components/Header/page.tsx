import { signOut } from 'firebase/auth';
import icon from '../../../public/favicon.png';
import Link from 'next/link'; 
import { auth } from '@/services/firebase';
import { useState } from 'react';
import { Dropdown, MenuProps } from 'antd';
import { handleLogOut } from '@/utilis/helpers/logout';

const items: MenuProps['items'] = [
  {
    key: '0',
    label: <h1 onClick={handleLogOut}>LOGOUT</h1>,
  },
]

export default function Header() {
    return (
        <header className="flex justify-between items-center p-1 bg-black bg-opacity-90 shadow-md">
            <Dropdown
            menu={{items}}
            trigger={['hover']}
            >
            <img src={icon.src} alt="icon" width={50} height={50}/>
            </Dropdown>
            <nav className="flex space-x-6">
                <Link href="/">Home</Link> 
                <Link href="/functions">Functions</Link>
                <Link href="/about">About</Link>
            </nav>
        </header>
    );
}
