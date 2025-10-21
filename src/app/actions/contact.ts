"use server";
import { revalidatePath } from "next/cache";
import { createContact, deleteContact, updateContact } from "../api/contact";
import { getSession } from "../_lib/session";
import { ContactType } from "../_types/contact";

export const createContactAction = async (
  prevState: any,
  formData: FormData
) => {
  if (!formData) {
    return { error: `Form data is missing` };
  }
  const user = await getSession();
  console.log(user);
  const name = formData.get("name")?.toString();
  const email = formData.get("email")?.toString();
  const userId = user?.id;
  if (!name || !email || !userId) {
    return { error: "All fields are required" };
  }
  const newContact: ContactType = { name, email, userId };

  try {
    await createContact(newContact);
    revalidatePath("/contact");
    return { success: true };
  } catch (error) {
    console.log("Error Creating contact:", error);
    return { error: "Failed to create contact" };
  }
};

export const updateContactAction = async (
  prevState: any,
  formData: FormData
) => {
  const user = await getSession();
  const id = formData.get("id") as string
  console.log(user);
  const name = formData.get("name")?.toString();
  const email = formData.get("email")?.toString();
  const userId = user?.id;
  if (!name || !email || !userId) {
    return { error: "All fields are required" };
  }
  const updatedContact: ContactType = { name, email, userId };

  try {
    await updateContact(id, updatedContact);
    revalidatePath("/contact");
    return { success: true };
  } catch (error) {
    console.log("Error updating contact:", error);
    return { error: "Failed to update contact" };
  }
};

export const deleteContactAction = async (
  prevState: any,
  formData: FormData
) => {
  const id = formData.get("id") as string;
  try {
    await deleteContact(id);
    revalidatePath("/contact");
    return { success: true };
  } catch (error) {
    console.log("Error Deleting contact:", error);
    return { error: "Failed to delete contact" };
  }
};
