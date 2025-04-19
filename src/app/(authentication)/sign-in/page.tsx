'use client'; 

import { Form, notification } from 'antd';
import { useDispatch } from 'react-redux';
import { fetchUserData, setIsAuth } from '@/state-management/slices/userSlice';
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/services/firebase';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ROUTE_PATHS } from '@/utilis/constants';
import { login } from '@/types/auth';
import { AppDispatch } from '@/state-management/store';

const Login = () => {
    const [ form ] = Form.useForm();
    const router = useRouter();
    const [ loading, setLoading ] = useState<boolean>( false );
    const [ error, setError ] = useState<string>('');
    const dispatch = useDispatch<AppDispatch>();

    const handleLogin = async (values: login) => {
      setLoading( true );
      try{
      const { email, password } = values;
      const user = await signInWithEmailAndPassword( auth, email, password );

      dispatch(fetchUserData());
      dispatch(setIsAuth(true));
      
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uid: user.user.uid,
        })
      });

      if (res.ok) {
        router.push(ROUTE_PATHS.HOME);
      } else {
        setError('Authentication failed, please try again.');
        notification.error({
          message: 'Authentication failed, please try again.',
        });
      }

     form.resetFields();
      }catch( error:any ){
        console.log(error.message);
        setError(error.message);
      }finally{
              setLoading( false );
      };
    };

    return (
  <Form
    layout="vertical"
    onFinish={handleLogin}
    initialValues={{ email: '', password: '' }} 
    form={form}
    style={{padding: 10}}
    className="w-2/3 bg-gray-900 border border-gray-700 rounded-md p-10 space-y-6" 
  >
    <h2 className="text-3xl font-bold text-center text-white drop-shadow-[0_0_6px_#8b5cf6]">
      Login
    </h2>
    <Form.Item
      name="email"
      rules={[{ required: true, message: 'Please enter your email.' }]}
    >
      <input
        type="email"
        placeholder="Your email*"
        onChange={() => setError('')}
        className="w-full bg-gray-900 border border-gray-700 rounded-md px-4 py-3 text-white placeholder-gray-400 shadow-inner shadow-black focus:outline-none focus:ring-2 focus:ring-violet-600"
      />
    </Form.Item>

    <Form.Item
      name="password"
      tooltip="6–16 characters, number, symbol, upper & lowercase."
      rules={[
        { required: true, message: 'Please enter your password.' },
      ]}
    >
      <input
        type="password"
        placeholder="Your password*"
        onChange={() => setError('')}
        className="w-full bg-gray-900 border border-gray-700 rounded-md px-4 py-3 text-white shadow-inner shadow-black focus:outline-none focus:ring-2 focus:ring-violet-600"
      />
    </Form.Item>
    <p style={{color: 'red'}}>{error}</p>
    <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 pt-4">
      <button
        type="submit"
        disabled={loading}
        className="transition-all bg-gradient-to-br from-violet-600 to-purple-700 hover:from-purple-700 hover:to-violet-800 px-8 py-3 rounded-md text-white font-medium shadow-[0_0_10px_rgba(139,92,246,0.6)] hover:shadow-[0_0_20px_rgba(139,92,246,0.8)]"
      >
        {loading ? 'Logining...' : 'Login'}
      </button>

      <Link
        href={ROUTE_PATHS.SIGN_UP}
        className="text-violet-300 hover:text-violet-400 hover:underline transition drop-shadow-[0_0_4px_rgba(139,92,246,0.5)]"
      >
        Sign up
      </Link>
    </div>
  </Form>
    );
};

export default Login;
