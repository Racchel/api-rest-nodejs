import mongoose from "mongoose";
import { IUserDocument } from "./user.model";

export interface ISessionDocument extends mongoose.Document {
    user: IUserDocument["_id"]
    valid: boolean;
    userAgent: string;
    created_at: Date;
    updated_at: Date;
};

const sessionSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref:"User" },
    valid: { type: Boolean, default: true },
    userAgent: { type: String  }
},{
    timestamps: true
});

const SessionModel = mongoose.model<ISessionDocument>("Session", sessionSchema);

export default SessionModel;