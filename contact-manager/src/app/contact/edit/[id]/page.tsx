import ContactForm from '@/app/_components/ContactForm';
import { updateContactAction } from '@/app/actions/contact';
import { getContactById } from '@/app/api/contact';
import React, { use } from 'react'

const EditContactPage = ({params} : {params : Promise<{id : string}>}) => {
  const {id} =   use(params);
  const contact =  use(getContactById(id));
  console.log("The contact to edi is", contact)
  return (
    <div className=" flex flex-col justify-center items-center max-w mx-auto p-6 bg-white rounded-lg shadow-ld">
      <h1 className='text-2xl fontbold mb-6'>Edit Contact</h1>
      <ContactForm action={updateContactAction} contact={contact}/>
    </div>
  )
}

export default EditContactPage;