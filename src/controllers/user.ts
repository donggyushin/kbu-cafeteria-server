import { Request, Response } from 'express'
import { IUser, IAdmin } from '../types'
import UserModel from '../models/user'
import dotenv from 'dotenv'
import { encryptText, decryptText } from '../utils/aes256'
import { generateJsonwebtoken } from '../utils/jsonwebtoken'
dotenv.config()



// 유저를 회원가입 시키는 Controller

interface IUserLoginController {
    ok: boolean
    error: string
    token: string
}

export const UserLoginController = async (req: Request, res: Response) => {

    const {
        email,
        password
    } = req.body

    let result: IUserLoginController = {
        ok: true,
        error: null,
        token: null
    }

    // email 에 해당하는 유저를 찾는다. 

    try {

        const user = await UserModel.findOne({
            email
        })

        // 해당 user 가 존재하지 않는다면 error 
        if (user === null) {
            result.ok = false
            result.error = '존재하지 않는 이메일입니다.'
            res.json(result)
            return
        }

        // 유저가 존재한다면 암호화 된 비밀번호 비교
        const decryptedPassword: string = decryptText(user.password)
        if (password === decryptedPassword) {
            // 토큰 생성후 토큰 반환
            const token = generateJsonwebtoken(user.id)
            result.token = token
            res.json(result)
            return
        } else {
            result.ok = false
            result.error = '비밀번호가 일치하지 않습니다.'
            res.json(result)
            return
        }

    } catch (err) {
        console.error(err)
        result.error = "내부에러 발생"
        return res.json(result)
    }



}



export const giveAuthorities = async (req: Request, res: Response) => {
    interface reqBody {
        email: string
        password: string,
        authorities: IAdmin[]
    }

    interface Iresult {
        ok: boolean
        error: string
    }
    const { email, password, authorities } = req.body as reqBody
    let result: Iresult = {
        ok: false,
        error: null
    }
    if (email && password) {
        try {
            const user = await UserModel.findOne({
                email
            })

            if (user) {
                const userPassword = decryptText(user.password)
                if (userPassword === password) {
                    user.authorities = authorities
                    await user.save()
                    result.ok = true
                    return res.json(result)
                } else {
                    result.error = "패스워드가 틀렸습니다."
                    return res.json(result)
                }
            } else {
                result.error = "해당하는 유저는 존재하지 않습니다."
                return res.json(result)
            }

        } catch (err) {
            console.log(err.message)
            result.error = "서버 내부 에러 발생"
            res.json(result)
            return;
        }
    } else {
        result.error = "인자를 제대로 전달받지 못하였습니다."
        res.json(result)
        return;
    }
}


// 새로운 유저를 등록하는 Controller

interface IMakeNewAccountResult {
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
    let result: IMakeNewAccountResult = {
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
            const encryptedPassword: string = encryptText(password)
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