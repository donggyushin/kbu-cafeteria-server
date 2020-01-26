import { Request, Response, NextFunction } from 'express'
import { decodeFooJsonwebtoken } from '../utils/jsonwebtoken'
import { IUser } from '../types'
import UserModel from '../models/user'

declare module 'http' {
    interface IncomingHttpHeaders {
        "authentication"?: string
    }
}

interface ICheckUserAuthHeaderProps {
    authentication?: string
}

interface IResponseType {
    ok: boolean
    error: string
}

interface IUserRequest extends Request {
    user: IUser
}

export const checkUserAuth = async (req: IUserRequest, res: Response, next: NextFunction) => {
    const { authentication }: ICheckUserAuthHeaderProps = req.headers
    let result: IResponseType = {
        ok: false,
        error: null
    }
    if (authentication) {
        const userId: string = decodeFooJsonwebtoken(authentication)
        try {
            const user: IUser = await UserModel.findById(userId)
            if (user) {
                req.user = user
                next()
                return
            } else {
                result.error = `유효한 Cookie 가 아닙니다. 관리자에게 문의해주세요 01090411019`
                res.json(result)
                return
            }
        } catch (err) {
            result.error = `Internal error`
            res.status(500)
            res.json(result)
            return
        }

    } else {
        result.error = `Cookie 값이 확인되지 않았습니다. 관리자에게 문의해주세요 01090411019`
        res.json(result)
        return
    }
}