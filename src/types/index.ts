import mongoose from 'mongoose'


// 기도

export interface IstudentPray {
    name: string
    grade: number
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
    date: Date
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
    lunchPrice: number
    dinner: IDinner
    dinnerPrice: number
    fix: IFixMenu
    fixPrices: number[]
    daily: IDailyMenu
    dailyPrices: number[]
}

// 유저

export interface IUser extends mongoose.Document {
    email: string
    password: string
    name: string
    phone: string
    authorities: IAdmin[]
}





// 어드민 타입
export type IAdmin = "" | "COOK" | "PRAY"