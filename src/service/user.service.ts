import { DocumentDefinition } from "mongoose";
import UserModel, { IUserDocument } from "../models/user.model";
import { omit } from "lodash";

export async function createUser(
    input:DocumentDefinition<
        Omit<IUserDocument, "created_at" | "updated_at" | "comparePassword">
    >
) {
    try{
        const user = await UserModel.create(input);

        return omit(user.toJSON(),"password");

    } catch(e:any) { 
        throw new Error(e);
    }
}

export async function validatePassword({ 
    email,
    password 
}:{ 
    email: string;
    password: string;  
}) {
    const user = await UserModel.findOne({ email });

    if (!user) {
        return false;
    }

    const isValid = await user.comparePassword(password);

    if(!isValid) return false;

    return omit(user.toJSON(),"password");
} 