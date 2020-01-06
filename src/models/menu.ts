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
    dinner: dinnerSchema,
    daily: dailyMenuSchema,
    fix: fixMenuSchema
})

const MenuModel = mongoose.model<IMenu>('menu', menuSchema)
export default MenuModel