"use client"
import React, { useActionState, useEffect } from 'react';
import { ContactType } from '../_types/contact';
import { useRouter } from 'next/navigation';

type ContactFormProps = {
    action : (args :{prevState: any, formData : FormData}) => Promise <any>;
    contact? : ContactType
}

function ContactForm({action, contact} : ContactFormProps) {
  const router = useRouter()
    const [state, formAction] = useActionState(action, null)

    useEffect(() => {
      if(state?.success) {
        router.push("/contact")
      }
    }, [state, router])
  return (
    <form action={formAction} className='space-x-4'>
      <input type='hidden'  name='id' value={contact?.id}/>
        <div className='w-full'>
            <label htmlFor='name' className='font-medium'>Name</label>
            <input type='name' defaultValue={contact?.name || ""} name='name' placeholder='Enter your name' required className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 focus:outline-none'/>
          </div>
          <div className='w-full'>
            <label htmlFor='email' className='font-medium'>Email</label>
            <input type='email' defaultValue={contact?.email || ""} name='email' placeholder='Enter your email' required className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 focus:outline-none'/>
          </div>
          {state?.error && (
            <div className='text-red-500 text-sm'>{state.error}</div>
          )}
          <button type='submit' className='mt-3 w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition'>Save Contact</button>
        </form>
  )
}

export default ContactForm