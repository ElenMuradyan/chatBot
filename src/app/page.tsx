'use client'
import Home from '@/components/Home/page';
import { fetchUserData } from "@/state-management/slices/userSlice";
import { AppDispatch, RootState } from "@/state-management/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import '../styles/home.css';

export default function HomePage() {
  const dispatch = useDispatch<AppDispatch>();
  const isAuth = ((state: RootState) => state.userData.authUserInfo.isAuth);
  const userData = ((state: RootState) => state.userData.authUserInfo.userData);
  const error = ((state: RootState) => state.userData.error);

  useEffect(() => {
    if(!userData && !isAuth && !error){
        dispatch(fetchUserData());
      }
  }, [dispatch]);
    
  return (
    <Home />
  );
};  