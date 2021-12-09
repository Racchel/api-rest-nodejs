import { DocumentDefinition } from "mongoose";
import UserModel, { IUserDocument } from "../models/user.model";

export async function createUser(
    input:DocumentDefinition<
        Omit<IUserDocument, "created_at" | "updated_at" | "comparePassword">
    >
) {
    try{
        return await UserModel.create(input);
    } catch(e:any) { 
        throw new Error(e);
    }
    
}