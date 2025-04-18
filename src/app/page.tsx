'use client'
import Home from '@/components/Home/page';
import '../styles/home.css';
import { fetchUserData } from "@/state-management/slices/userSlice";
import { AppDispatch } from "@/state-management/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { usePathname } from 'next/navigation';

export default function HomePage() {
  const dispatch = useDispatch<AppDispatch>();
  const pathName = usePathname();

  useEffect(() => {
    dispatch(fetchUserData());
  }, [pathName]);

  return (
    <Home />
  );
};  