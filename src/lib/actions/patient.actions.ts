'use server'
// import  {CreateUserParams}  from "@/types/index";

import { Query, ID ,Client, Storage } from "node-appwrite";
import { parseStringify } from "../utils";
import {InputFile} from "node-appwrite/file"
import {
    NEXT_PUBLIC_BUCKET_ID,
    NEXT_PUBLIC_DATABASE_ID,
    NEXT_PUBLIC_ENDPOINT,
    NEXT_PUBLIC_PATIENT_COLLECTION_ID,
    NEXT_PUBLIC_PROJECT_ID,
    databases,
    storage,
    users,
  } from "../appwrite.config";




export const createUser = async (user: CreateUserParams) => {
    try {
        console.log(users);

        const newUser = await users.create(
            ID.unique(), 
            user.email, 
            user.phone, 
            undefined,
            user.name);
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

export const registerPatient= async ({identificationDocument,...patient}:RegisterUserParams)=>{
    //console.log('this',identificationDocument)
    try {
        let file

    if (identificationDocument){
        const inputFile=InputFile.fromBuffer(
            identificationDocument?.get("blobFile") as Blob,
            identificationDocument?.get("fileName") as string
        )
        file= await storage.createFile(
            NEXT_PUBLIC_BUCKET_ID as string,
            ID.unique(),
            inputFile)
    }
    
    const newPatient= await databases.createDocument(
        NEXT_PUBLIC_DATABASE_ID!, // databaseId
        NEXT_PUBLIC_PATIENT_COLLECTION_ID as string,// collectionId
        ID.unique(), // documentId
        {
            identificationDocumentId: file?.$id ? file.$id : null,
            identificationDocumentUrl: file?.$id
          ? `${NEXT_PUBLIC_ENDPOINT}/storage/buckets/${NEXT_PUBLIC_BUCKET_ID}/files/${file.$id}/view??project=${NEXT_PUBLIC_PROJECT_ID}`
          : null,
        ...patient,
        }, // data
    );
    return parseStringify(newPatient)
        
    } catch (error) {
        console.log(error)
        
    }

}

export const getPatient = async (userId: string) => {
    try {
        //console.log("userId is", userId);
        const patients = await databases.listDocuments(
            NEXT_PUBLIC_DATABASE_ID!, // databaseId
            NEXT_PUBLIC_PATIENT_COLLECTION_ID as string, // collectionId
            //[Query.equal("email", ["jof@gmail.com","jof@gmail.com"])],
            //Query.equal只能回傳第一個符合條件的結果，不能回傳所有符合條件的結果
            [Query.contains("userId", userId)],


        );
        // console.log("patients",patients.documents.length);
        // console.log("hello")
        // console.log("from database",patients);
        return parseStringify(patients.documents[0]);
    } catch (error: any) {
        console.log(error);
    }
}