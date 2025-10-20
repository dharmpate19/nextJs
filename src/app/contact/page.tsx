import React from "react";
import { getSession } from "../_lib/session";
import { getContacts } from "../api/contact";
import ContactList from "../_components/ContactList";

const ContactPage = async () => {
  const user = await getSession();

  if (!user) {
    return (
      <div>
        Please{" "}
        <a href="/login" className="text-blue-600 hover:underline">
          Login
        </a>{" "}
        to view contacts
      </div>
    );
  }
  const contacts = await getContacts(user?.id);
  console.log(contacts);
  if (!contacts || contacts.length === 0) {
    return (
      <div>
        Please{" "}
        <a href="/contact/new" className="text-blue-600 hover:underline">
          add a contact
        </a>{" "}
        to your contact list
      </div>
    );
  }
  return (
    <>
    <div className="flex justify-between items-center mb-6">
      <h1>Your Contacts</h1>
      <a href="/contact/new" className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200">Add Contact</a>
    </div>
    <ContactList contacts = {contacts}/>
</>
  );
};

export default ContactPage;
