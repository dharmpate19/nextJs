//Client Component
"use client";

import React from 'react'
import { loginAction } from '@/app/actions/auth';

const LoginFrom = () => {
  return (
    <form action={loginAction} className='space-x-4'>
      <div className='w-full'>
        <label className='font-medium'>Email</label>
        <input type='email' name='email' placeholder='Enter your email' required className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 focus:outline-none'/>
      </div>
      <div className='mt-3 w-full'>
        <label className='font-medium'>Password</label>
        <input type='password' name='password' placeholder='Enter your password' required className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 focus:outline-none'/>
      </div>
      <button type='submit' className='mt-3 w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition'>Login</button>
    </form>
  )
}

export default LoginFrom