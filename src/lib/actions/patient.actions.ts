// import  {CreateUserParams}  from "@/types/index";
import { Query, ID } from "node-appwrite";
import { users } from "../appwrite.config";
import { parseStringify } from "../utils";
export const createUser = async (user: CreateUserParams) => {
    try {
        console.log(users);

        const newUser = await users.create(
            ID.unique(), 
            user.email, 
            user.phone, 
            undefined,
            user.username);
            console.log(newUser);
        return newUser;
    } catch (error: any) {
        if (error && error?.code === 409) {
            const documents = await users.list([
                Query.equal("email", user.email),
            ]);
            return documents?.users[0];
        }
    }

}

export const getUser = async (userId: string) => {
    try {
        const user = await users.get(userId);
        return parseStringify(user);
    } catch (error: any) {
        console.log(error);
    }
}