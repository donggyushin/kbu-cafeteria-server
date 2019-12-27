import { Request, Response } from 'express'
import { IUser } from '../types'
import UserModel from '../models/user'
import aes256 from 'aes256'
import dotenv from 'dotenv'
dotenv.config()

interface IResult {
    ok: boolean
    error: string
    user: IUser
}

export const makeNewAccount = async (req: Request, res: Response) => {
    const {
        email,
        password,
        name,
        phone
    }: IUser = req.body
    let result: IResult = {
        ok: true,
        error: null,
        user: null
    }
    // 해당 email 로 가입된 영양사가 있는지 확인해보고
    try {
        const existingUsers = await UserModel.find({
            email
        })

        const existingUsersNumber = existingUsers.length

        if (existingUsersNumber !== 0) {
            // 영양사가 존재하면 이미 존재한다고 알려주는 response
            result.ok = false
            result.error = '이미 존재하는 아이디입니다.'
            res.json(result)
            return

        } else {
            // 존재하지 않는다면 영양사로부터 입력받은 데이터값들을 대상으로 aes256 암호화를 해서 새로운 유저 등록
            const key = process.env.AES256_KEY
            const encryptedPassword = aes256.encrypt(key, password)
            const user = new UserModel({
                email,
                password: encryptedPassword,
                name,
                phone
            })

            user.save()

            result.user = user
            res.json(result)
            return
        }

    } catch (err) {
        result.ok = false
        result.error = err.message,
            res.json(result)
        return
    }

}