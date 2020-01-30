import { Response, Request } from 'express'
import PrayModel from '../models/todayPray'
import { ITodayPray, IUser } from '../types/index'
import dotenv from 'dotenv'
dotenv.config()

interface IgetTodayPrayParams {
    date?: string
}

interface IgetTodayPrayResponse {
    ok: boolean
    error: string
    todayPray: ITodayPray
}

export const getTodayPray = async (req: Request, res: Response) => {
    const { date } = req.params as IgetTodayPrayParams
    let result: IgetTodayPrayResponse = {
        ok: false,
        error: null,
        todayPray: null
    }
    if (date) {
        const dateObject = new Date(parseInt(date))
        const year = dateObject.getFullYear()
        const month = dateObject.getMonth()
        const day = dateObject.getDate()

        try {
            const fields = {
                writer: 0
            }

            const todayPray = await PrayModel.findOne({
                year,
                month,
                day
            })
                .select(fields)



            if (todayPray) {

                result.ok = true
                result.todayPray = todayPray

                res.json(result)
                return;

            } else {
                result.ok = false
                result.error = '해당 날짜의 오늘의 기도문이 존재하지 않습니다.'
                res.json(result)
                return
            }

        } catch (err) {
            console.error(err)
            result.error = "오늘의 기도 데이터를 불러오던 도중에 에러가 발생하였습니다. "
            res.json(result)
            return;
        }


    } else {
        result.error = "인자를 제대로 전달받지 못하였습니다. 누락된 parameter: date"
        res.json(result)
        return;
    }
}



interface IstudentPray {
    name: string
    grade: number
    prays: string[]
}

interface IpostTodayPrayBody {
    studentPray?: IstudentPray[]
    ads?: string[]
    todayPrayContent?: string[]
}

interface IpostTodayPrayResponse {
    ok: boolean
    error: string
    todayPray: ITodayPray
}

interface IUserRequest extends Request {
    user: IUser
}

export const postTodayPray = async (req: IUserRequest, res: Response) => {
    const { studentPray, ads, todayPrayContent } = req.body as IpostTodayPrayBody
    const date = new Date()
    let result: IpostTodayPrayResponse = {
        ok: false,
        error: null,
        todayPray: null
    }
    if (studentPray && todayPrayContent) {


        const writer = req.user
        const year = date.getFullYear()
        const month = date.getMonth()
        const day = date.getDate()

        try {

            const existingPray = await PrayModel.findOne({
                year,
                month,
                day
            })

            if (existingPray) {

                existingPray.writer = writer
                existingPray.ads = ads
                existingPray.studentPray = studentPray
                existingPray.todayPrayContent = todayPrayContent
                try {
                    await existingPray.save()

                    result.ok = true
                    result.todayPray = existingPray
                    res.json(result)
                    return;

                } catch (err) {
                    result.error = '기도문을 수정하던 도중에 에러발생'
                    res.json(result)
                    return;
                }

            } else {

                try {
                    const todayPray = await new PrayModel({
                        writer,
                        year,
                        month,
                        day,
                        studentPray,
                        ads,
                        todayPrayContent
                    })

                    todayPray.writer

                    await todayPray.save()
                    result.ok = true
                    result.todayPray = todayPray
                    res.json(result)
                    return;

                } catch (err) {
                    console.log(`새로운 today 객체를 만들다가 오류 발생. `)
                    result.error = '새로운 today 객체를 만들다가 오류 발생. '
                    res.json(result)
                    return
                }

            }





        } catch (err) {
            console.log('기존에 존재하는 기도문을 찾던 도중에 에러 발생.')
            result.error = '기존에 존재하는 기도문을 찾던 도중에 에러 발생.'
            res.json(result)
            return
        }




    } else {
        result.error = '인자를 제대로 전달받지 못하였습니다. '
        console.log('studentPray: ', studentPray)
        console.log('ads: ', ads)
        console.log('todayPrayContent: ', todayPrayContent)
        res.json(result)
        return
    }
}