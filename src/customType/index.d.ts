import { IUser } from '../types'
import { Request } from 'express'

declare namespace Express {
    export interface Request {
        user: IUser
        test: string
    }
}