"use client"
import React from 'react'
import { ContactType } from '../_types/contact'

const ContactList = ({contacts} : {contacts : ContactType[]}) => {
    
  return (
    <div className='space-y-4'>{contacts.map((contact) => {
        return <div key={contact.id} className='p-4 border rounded-lg'>
            <div className="flex justify-between items-start">
                <div>
                    <h2 className='text-lg font-semibold'>{contact.name}</h2>
                </div>
            </div>
        </div>
    })}</div>
  )
}

export default ContactList