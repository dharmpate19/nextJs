import Link from 'next/link';
import React from 'react'
import LogoutButton from './LogoutButton';
import { getSession } from '../_lib/session';
import { logoutAction } from '../actions/auth';

const Navbar = async() => {
    const session = await getSession();
  return (
    <nav className="bg-white shadow-sm">
        <div className="container mx-auto p-4  flex justify-between item-center">
            <Link href="/" className='text-xl font-bold text-blue-600'>Contact Manager</Link>
            <div className="flex items-center justify-center space-x-4">
                {session ? (
                    <>
                    <Link href="/contact" className='hover:text-blue-600'>
                    Contact
                    </Link>
                    <LogoutButton/>
                    </>
                ) : (
                    <>
                    <Link href="/login" className='hover:text-blue-600 mr-5'>
                    Login
                    </Link>
                    <Link href="/register" className='hover:text-blue-600 '>
                    Register
                    </Link>
                    </>

                )}
            </div>
        </div>
    </nav>
  )
}

export default Navbar;
