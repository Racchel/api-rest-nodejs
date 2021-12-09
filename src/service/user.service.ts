import { DocumentDefinition } from "mongoose";
import UserModel, { IUserDocument } from "../models/user.model";

export async function createUser(input:DocumentDefinition<IUserDocument>) {
    try{
        return await UserModel.create(input);
    } catch(e:any) {
        throw new Error(e);
    }
    
}