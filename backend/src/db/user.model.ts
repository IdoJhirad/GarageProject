import mongoose, { Schema, Document, Model ,Types} from "mongoose";
import bcrypt from "bcryptjs";
import Garage, { IGarage } from "./garage.model";
/**
 * This interface extends the Mongoose Document interface, describing
 * the user document's shape (what fields it has) AND what instance
 * methods are available.
 */
export interface IUser extends Document {
    _id: Types.ObjectId;
    name:string;
    email: string;
    password: string;
    savedGarages: Types.ObjectId[];
    // The signatures for our instance methods:
    encryptPassword(password: string): Promise<string>;
    validPassword(password: string): Promise<boolean>;
}
/**
 * custom Model interface extends the generic Mongoose Model,
 */
interface IUserModel extends Model<IUser> {}
/**
 * The UserSchema defines the structure and configuration of the 'User'
 */
const UserSchema = new Schema<IUser>(
    {
        name:  { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        savedGarages: [{type: mongoose.Schema.Types.ObjectId, ref:"Garage"}]
    },
    { timestamps: true }
);
/**
 * userSchema.methods defines instance methods. That means every document
 * of type "User" can call these methods directly, e.g. userDoc.validPassword(...).
 */
// Schema methods
UserSchema.methods.encryptPassword = async function (password: string) {
    return await bcrypt.hash(password, 10);
};

UserSchema.methods.validPassword = async function (password: string) {
    return await bcrypt.compare(password, this.password);
};
/**
 *  create the User model using mongoose. Model, providing our IUser interface
 * and IUserModel so TypeScript knows about the fields and methods.
 */
const User: IUserModel = mongoose.model<IUser, IUserModel>("User", UserSchema);
export default User;
