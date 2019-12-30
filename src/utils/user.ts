import { IUser } from '../types'
import UserModel from '../models/user'
import { decodeFooJsonwebtoken } from '../utils/jsonwebtoken'

export const findUserByToken = async (token: string): Promise<IUser> => {
    const userId = decodeFooJsonwebtoken(token)
    try {
        const user: IUser = await UserModel.findById(userId)
        return user
    } catch (err) {
        return null
    }
}