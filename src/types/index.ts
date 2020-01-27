import mongoose from 'mongoose'


// 기도

export interface IstudentPray {
    name: string
    studentId: string
    prays: string[]
}

export interface ITodayPray extends mongoose.Document {
    year: number
    month: number
    day: number
    studentPray: IstudentPray[]
    ads: string[]
    todayPrayContent: string[]
    writer: IUser
}







// 학식


export interface IFixMenu extends mongoose.Document {
    menus: string[]
}

export interface IDailyMenu extends mongoose.Document {
    menus: string[]
}

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
    fix: IFixMenu
    daily: IDailyMenu
}

// 유저

export interface IUser extends mongoose.Document {
    email: string
    password: string
    name: string
    phone: string
    authorities: IAdim[]
}





// 어드민 타입
export type IAdim = "" | "COOK" | "PRAY"