import mongoose from 'mongoose'

export interface ILunch extends mongoose.Document {
    menus: string[]
}

export interface IDinner extends mongoose.Document {
    menus: string[]
}

export interface IMenu extends mongoose.Document {
    year: number
    month: number
    day: number
    lunch: ILunch
    dinner: IDinner
}

export interface IUser extends mongoose.Document {
    email: string
    password: string
    name: string
    phone: string
}