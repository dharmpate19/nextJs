"use client";
import React from 'react'
import { logoutAction } from '../actions/auth';
import { useRouter } from 'next/navigation';

const LogoutButton = () => {
  const router = useRouter()
  const handleLogout = async() => {
    try {
      await logoutAction();

      //The redirct happens in server action

      //The client-side redirect is a fallback
      // redirect("/login")
      router.push("/login");
      router.refresh()
    } catch (error) {
      console.log("Logout Failed:", error)
    }

      }
  return (
    <div><button className='px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-color cursor-pointer' onClick={handleLogout}>Logout</button></div>
  )
}

export default LogoutButton