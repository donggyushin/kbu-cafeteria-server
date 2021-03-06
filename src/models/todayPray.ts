import mongoose, { Schema } from 'mongoose'
import { ITodayPray } from '../types'
import { UserSchema } from './user'


const studentPraySchema = new Schema({
    name: String,
    grade: Number,
    prays: [String],
})

const todayPraySchema = new Schema({
    year: Number,
    month: Number,
    day: Number,
    studentPray: [studentPraySchema],
    ads: [String],
    todayPrayContent: [String],
    writer: UserSchema,
    date: {
        type: Date,
        default: Date.now
    }
})

const PrayModel = mongoose.model<ITodayPray>('todayPray', todayPraySchema)
export default PrayModel