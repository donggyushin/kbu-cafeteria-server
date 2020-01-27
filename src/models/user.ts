import mongoose from 'mongoose'
import { IUser, IAdim } from '../types'


export const UserSchema = new mongoose.Schema({
    email: String,
    password: String,
    name: String,
    phone: String,
    authorities: [String]
})

const UserModel: mongoose.Model<IUser> = mongoose.model<IUser>('user', UserSchema)
export default UserModel