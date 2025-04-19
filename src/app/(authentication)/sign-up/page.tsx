'use client'

import { Form, notification } from 'antd';
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '@/services/firebase';
import { FIRESTORE_PATH_NAMES } from '@/utilis/constants';
import { doc, setDoc } from 'firebase/firestore';
import { register } from '@/types/auth';
import { ROUTE_PATHS } from '@/utilis/constants';
import { regexpValidation } from '@/utilis/validators';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Register = () => {
     const [ form ] = Form.useForm();
     const { push } = useRouter();
     const [ loading, setLoading ] = useState<boolean>( false );
     const [ error, setError ] = useState<string>('');

     const handleRegister = async (values: register) => {
        const { email, password, userName } = values;
        try{
            setLoading(true);
            const response = await createUserWithEmailAndPassword( auth, email, password );
            const { uid } = response.user;
            const createDoc = doc(db, FIRESTORE_PATH_NAMES.REGISTERED_USERS, uid);

            await setDoc(createDoc, {
                uid, userName, email
            });
            notification.success({
                message: "Գրանցումը հաջողությամբ իրականացվել է",
                description: "Ձեր հաշիվը հաջողությամբ ստեղծվել է։"
            });

            form.resetFields();
            push(ROUTE_PATHS.SIGN_IN);
        } catch (error) {
          const err = error as Error;
          console.log(err.message);
          setError(err.message);
        }finally{
            setLoading(false);
    }};

    return(
  <Form
    layout="vertical"
    onFinish={handleRegister}
    form={form}
    style={{padding: 10}}
    initialValues={{ email: '', password: '', userName: '' }} 
    className="w-2/3 bg-gray-900 border border-gray-700 rounded-md p-10 space-y-6" 
  >
    <h2 className="text-3xl font-bold text-center text-white drop-shadow-[0_0_6px_#8b5cf6]">
      Register
    </h2>

    {/* Name */}
    <Form.Item
      name="userName"
      rules={[{ required: true, message: 'Please enter your name.' }]}
    >
      <input
        type="text"
        placeholder="Your name*"
        className="w-full bg-gray-900 border border-gray-700 rounded-md px-4 py-3 text-white placeholder-gray-400 shadow-inner shadow-black focus:outline-none focus:ring-2 focus:ring-violet-600"
      />
    </Form.Item>

    {/* Email */}
    <Form.Item
      name="email"
      rules={[{ required: true, message: 'Please enter your email.' }]}
    >
      <input
        type="email"
        placeholder="Your email*"
        className="w-full bg-gray-900 border border-gray-700 rounded-md px-4 py-3 text-white placeholder-gray-400 shadow-inner shadow-black focus:outline-none focus:ring-2 focus:ring-violet-600"
      />
    </Form.Item>

    {/* Password */}
    <Form.Item
      name="password"
      tooltip="6–16 characters, number, symbol, upper & lowercase."
      rules={[
        { required: true, message: 'Please enter your password.' },
        { pattern: regexpValidation, message: 'Weak password.' },
      ]}
    >
      <input
        type="password"
        placeholder="Your password*"
        className="w-full bg-gray-900 border border-gray-700 rounded-md px-4 py-3 text-white shadow-inner shadow-black focus:outline-none focus:ring-2 focus:ring-violet-600"
      />
    </Form.Item>
    <p style={{color: 'red'}}>{error}</p>
    {/* Button + Link */}
    <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 pt-4">
      <button
        type="submit"
        disabled={loading}
        className="transition-all bg-gradient-to-br from-violet-600 to-purple-700 hover:from-purple-700 hover:to-violet-800 px-8 py-3 rounded-md text-white font-medium shadow-[0_0_10px_rgba(139,92,246,0.6)] hover:shadow-[0_0_20px_rgba(139,92,246,0.8)]"
      >
        {loading ? 'Registering...' : 'Register'}
      </button>

      <Link
        href={ROUTE_PATHS.SIGN_IN}
        className="text-violet-300 hover:text-violet-400 hover:underline transition drop-shadow-[0_0_4px_rgba(139,92,246,0.5)]"
      >
        Sign In
      </Link>
    </div>
  </Form>
      );
  };    
export default Register;