"use server"

import axios from "axios"
import { redirect } from "next/navigation"
import { UserType } from "@/app/_types/user"
import { FromData } from "@/app/_types/formdata"

const API_URL = "http://localhost:3001"

export const loginAction = async (formData : FormData) => {
    console.log("Form Data :" ,formData)
try{
const response = await axios.get(`${API_URL}/users?email=${formData.get("email")}&password=${formData.get("password")}`);
console.log(response.data[0])
const user : UserType  = response.data[0];
if(!user) throw new Error("Invalid Credential")
    //Set user in cookies
    console.log("Done")
}catch (error) {
    throw new Error("User not logged in")
};
redirect("/contact")
}

export const logoutAction = async () => {
    await deleteSession();
    redirect("/login")
}