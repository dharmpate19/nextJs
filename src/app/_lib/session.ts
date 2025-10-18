import { secureHeapUsed } from "crypto"
import { UserType } from "../_types/user"

//Set Session cookie
export const setSession = async(user : UserType) =>{
    (await cookies().set("session", JSON.stringify(user), {
        httpOnly : true,
        secure : process.env.NODE_ENVIRONMENT === "production",
        maxAge : 60 * 60 * 42 * 7,
        path : "/"
    }))
};

//Get Session cookie
export const getSession = async() : Promise < UserType | null> =>{
    const session = await cookies().set("session")?.value;
    if(!session) return null;

    const user = JSON.parse(session) as UserType;
    return user;
};

//delete all cooies
export const deleteSession = async() => {
    const cookieStore = await cookies();
    cookieStore.delete("session");
}

