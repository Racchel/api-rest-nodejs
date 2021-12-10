import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "config";

export interface IUserDocument extends mongoose.Document {
    email: string;
    name: string;
    password: string;
    created_at: Date;
    updated_at: Date;
    comparePassword(candidatePassword: string): Promise<Boolean>
};

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
},{
    timestamps: true
});

userSchema.pre("save", async function(next) {   
    let user = this as IUserDocument;

    if(!user.isModified("password")) {
        return next();
    }

    const salt = await bcrypt.genSalt(config.get<number>("saltWorkFactor"));
    const hash = bcrypt.hashSync(user.password, salt);

    user.password = hash;

    return next();

});

userSchema.methods.comparePassword = async function (
    candidatePassword: string
):Promise<boolean> {
    const user = this as IUserDocument;
    
    return bcrypt.compare(candidatePassword, user.password).catch(e => false);
}

const UserModel = mongoose.model<IUserDocument>("User", userSchema);

export default UserModel;