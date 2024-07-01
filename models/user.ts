import mongoose, { Schema, Document } from "mongoose"; 9

export interface User extends 
Document{
    email: string;
    password: string;
}

const UserSchema: Schema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});
export default
mongoose.models.User ||
mongoose.model<User>('User', UserSchema);
