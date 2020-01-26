import mongoose, { Schema } from 'mongoose'
import { ITodayPray } from '../types'
import { UserSchema } from './user'


const studentPraySchema = new Schema({
    name: String,
    studentId: String,
    prays: [String]
})

const todayPraySchema = new Schema({
    year: Number,
    month: Number,
    day: Number,
    studentPray: [studentPraySchema],
    ads: [String],
    todayPrayContent: [String],
    writer: UserSchema
})

const PrayModel = mongoose.model<ITodayPray>('todayPray', todayPraySchema)
export default PrayModel