import LoginFrom from '@/app/_components/LoginFrom';
import Link from 'next/link';
import React from 'react';

const LoginPage = () => {
  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h1 className='text-2xl font-bold mb-6'>Login</h1>
      <LoginFrom/>
      <p className='mt-4 text-center font-semibold '>Don't have a link ? <Link href="./register" className='text-blue-600 hover:underline'>Register</Link></p>
    </div>
  )
}

export default LoginPage;