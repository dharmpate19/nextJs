"use client"
import React from 'react'
import { ContactType } from '../_types/contact'
import { FiEdit } from 'react-icons/fi'
import Link from 'next/link'
import DeleteButton from './DeleteButton'
import { deleteContactAction } from '../actions/contact'

const ContactList = ({contacts} : {contacts : ContactType[]}) => {
    
  return (
    <div className='space-y-4'>{contacts.map((contact) => {
        return <div key={contact.id} className='p-4 border rounded-lg'>
            <div className="flex justify-between items-start">
                <div>
                    <h2 className='text-lg font-semibold'>{contact.name}</h2>
                    <p>{contact.email}</p>
                </div>
                <div className="flex items-center self-center gap-3">
                    <Link href={`/contact/edit/${contact.id}`} className='inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-blue-600 border'>
                    <FiEdit className='text-blue-600'/>
                    Edit
                    </Link>
                    <DeleteButton contact={contact} action={deleteContactAction}/>
                </div>
            </div>
        </div>
    })}</div>
  )
}

export default ContactList