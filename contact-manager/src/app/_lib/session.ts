import {cookies} from "next/headers"
import { UserType } from "../_types/user"

//Set Session cookie
export const setSession = async(user : UserType) =>{
    const cookieSession = await  cookies()
    cookieSession.set("session", JSON.stringify(user), {
        httpOnly : true,
        secure : process.env.NODE_ENV === "production",
        maxAge : 60 * 60 * 42 * 7,
        path : "/"
    })
};

//Get Session cookie
export const getSession = async() : Promise < UserType | null> =>{
    const cookieSession = await cookies()
    const session = cookieSession.get("session")?.value;
    if(!session) return null;

    const user = JSON.parse(session) as UserType;
    return user;
};

//delete all cooies
export const deleteSession = async() => {
    const cookieStore =  await cookies();
    cookieStore.delete("session");
}

