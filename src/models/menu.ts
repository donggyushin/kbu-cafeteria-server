import mongoose, { Schema } from 'mongoose'
import { IMenu } from '../types'

const dailyMenuSchema = new Schema({
    menus: [String]
})

const fixMenuSchema = new Schema({
    menus: [String]
})

const lunchSchema = new Schema({
    menus: [String]
})

const dinnerSchema = new Schema({
    menus: [String]
})

const menuSchema = new Schema({
    year: Number,
    month: Number,
    day: Number,
    lunch: lunchSchema,
    lunchPrice: Number,
    dinner: dinnerSchema,
    dinnerPrice: Number,
    daily: dailyMenuSchema,
    dailyPrices: [Number],
    fix: fixMenuSchema,
    fixPrices: [Number]
})

const MenuModel = mongoose.model<IMenu>('menu', menuSchema)
export default MenuModel