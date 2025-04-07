'use client'
import '../styles/home.css';
import { fetchUserData } from "@/state-management/slices/userSlice";
import { AppDispatch, RootState } from "@/state-management/store";
import { ROUTE_PATHS } from '@/utilis/constants';
import { useRouter } from 'next/navigation';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuth } = useSelector((state: RootState) => state.userData.authUserInfo)
  const { push } = useRouter();
  useEffect(() => {dispatch(fetchUserData())
  }, []);

  return (
    <div className="home">
      <div className="text-section w-1/2 p-8 flex flex-col justify-center items-start text-white">
        <h1 className="text-5xl font-bold mb-4">Meet Your AI Chatbot</h1>
        <p className="gradient-text">
          Our AI chatbot is here to assist you anytime! Whether you need help, advice, or just want to chat, we are ready to provide quick, intelligent responses.
          Get ready to experience seamless interaction with our advanced AI, designed to understand your needs and offer personalized support.
        </p>
        <h1>Say hello to the future of communication. Let's get started!</h1>
        <div className="flex space-x-4">
          <button onClick={() => isAuth ? push(ROUTE_PATHS.FUNCTIONS) : push(ROUTE_PATHS.SIGN_IN)}>
            Start Chatting
          </button>
          <button onClick={() => push(ROUTE_PATHS.ABOUT)}>
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};  