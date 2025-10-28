"use client"
import React, { useActionState } from 'react'
import { ContactType } from '../_types/contact'
import { FiTrash2 } from 'react-icons/fi'

type DeleteButtonProps = {
    action : (args :{prevState: any, formData : FormData}) => Promise <any>;
    contact? : ContactType
}

const DeleteButton = ({action, contact} : DeleteButtonProps) => {
    const [state, formAction] = useActionState(action, null)
  return (
    <div className='delete-button-wrapper flex items-center justify-start border border-red-300 rounded-md cursor-pointer hover:bg-red-50 transition'>
    <form action={formAction} method="POST">
        <input type='hidden' name='id' value={contact?.id}/>
        <button type='submit' className='delete-button flex items-center gap-2 px-3 py-1.5 bg-red-100 text-red-600 font-medium rounded hover:bg-red-200 transition'
        onClick={(e) => {
            if(!confirm("Are you sure you want to delete this contact ?"))
            e.preventDefault()
        }}
        >
            <FiTrash2 className='delete-icon text-red-500 text-lg'/>Delete
        </button>
    </form>
    </div>
  )
}

export default DeleteButton