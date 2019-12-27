import mongoose from 'mongoose'
import { IUser } from '../types'

const UserSchema = new mongoose.Schema({
    email: String,
    password: String,
    name: String,
    phone: String
})

const UserModel: mongoose.Model<IUser> = mongoose.model<IUser>('user', UserSchema)
export default UserModel