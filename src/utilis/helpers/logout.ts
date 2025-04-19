import { auth } from "@/services/firebase";
import { signOut } from "firebase/auth";

export const handleLogOut = async () => {
    try{
      await signOut(auth);
      const res = await fetch('/api/header', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
      },
      });

      if(!res.ok){
        throw new Error('Something is wrong.')
      }
    }catch{
      console.log('Error.');
    }
};

