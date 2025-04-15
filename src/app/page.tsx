'use client'
import Home from '@/components/Home/page';
import '../styles/home.css';
import { fetchUserData } from "@/state-management/slices/userSlice";
import { AppDispatch } from "@/state-management/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function HomePage() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  return (
    <Home />
  );
};  