import icon from '../../../public/favicon.png';
import Link from 'next/link'; 
import { Dropdown, MenuProps } from 'antd';
import { handleLogOut } from '@/utilis/helpers/logout';
import { getIsAuth } from '@/utilis/helpers/getIsAuth';
import { useEffect, useState } from 'react';

const items: MenuProps['items'] = [
  {
    key: '0',
    label: <h1 onClick={handleLogOut}>LOGOUT</h1>,
  },
]

export default function Header() {
  const [isAuth, setIsAuth] = useState<boolean>(false);

  useEffect(() => {
    const getAuth = async () => {
      const { isAuth } = await getIsAuth();
      setIsAuth(isAuth);      
    };

    getAuth();
  }, []);

    return (
        <header className="flex justify-between items-center p-1 bg-black bg-opacity-90 shadow-md">
            {
              isAuth ? <Dropdown
              menu={{items}}
              trigger={['click']}
              >
              <img style={{cursor: 'pointer'}} src={icon.src} alt="icon" width={50} height={50}/>
              </Dropdown>
              :
              <img style={{cursor: 'pointer'}} src={icon.src} alt="icon" width={50} height={50}/>
            }
            <nav className="flex space-x-6">
                <Link href="/">Home</Link> 
                <Link href="/functions">Functions</Link>
                <Link href="/about">About</Link>
            </nav>
        </header>
    );
}
