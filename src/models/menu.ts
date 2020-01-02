import mongoose, { Schema } from 'mongoose'
import { IMenu } from '../types'

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
    dinner: dinnerSchema
})

const MenuModel = mongoose.model<IMenu>('menu', menuSchema)
export default MenuModel