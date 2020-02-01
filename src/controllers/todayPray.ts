import { Response, Request } from 'express'
import PrayModel from '../models/todayPray'
import { ITodayPray, IUser } from '../types/index'
import dotenv from 'dotenv'
dotenv.config()

interface IGetTodayPrayByIdParams {
    id?: string
}

interface IGetTodayPrayByIdResult {
    ok: boolean
    error: string
    pray: ITodayPray
}

export const getTodayPrayById = async (req: Request, res: Response) => {
    const { id } = req.params as IGetTodayPrayByIdParams
    let result: IGetTodayPrayByIdResult = {
        ok: false,
        error: null,
        pray: null
    }
    if (id) {
        try {
            const pray = await PrayModel.findById(id).select({
                'writer.authorities': 0,
                'writer.password': 0,
                'writer.phone': 0,
                'writer.email': 0
            })

            result.ok = true
            result.pray = pray
            res.json(result)
            return;

        } catch (err) {
            console.error(err)
            result.error = "서버 내부에서 알수 없는 에러 발생"
            res.json(result)
            return;
        }
    } else {
        result.error = "id인자를 전달받지 못하였습니다."
        res.json(result)
        return
    }
}

interface IGetTodayPraysParams {
    page?: string
}

interface IGetTodayPraysResult {
    ok: boolean
    error: string
    prays: ITodayPray[]
    praysCount: number
}

export const getTodayPrays = async (req: Request, res: Response) => {
    const { page } = req.params as IGetTodayPraysParams

    const result: IGetTodayPraysResult = {
        ok: false,
        error: null,
        prays: [],
        praysCount: 0
    }

    if (page) {

        const skip = (parseInt(page) - 1) * 100
        try {
            const prays = await PrayModel.find({}, {
                'writer.authorities': 0,
                'writer.password': 0,
                'writer.email': 0,
                'writer.phone': 0,
                'year': 0,
                'month': 0,
                'day': 0,
            }, {
                skip,
                limit: 100
            })
                .sort({ date: -1 })

            const praysCount = await PrayModel.find().countDocuments()

            result.ok = true
            result.prays = prays
            result.praysCount = praysCount
            res.json(result)
            return

        } catch (err) {
            result.error = '서버에러 발생'
            res.json(result)
            return;
        }

    } else {
        result.error = 'page가 주어지지 않았습니다.'
        res.json(result)
        return
    }
}

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
                'writer.authorities': 0,
                'writer.password': 0,
                'writer.email': 0,
                'writer.phone': 0,
                'year': 0,
                'month': 0,
                'day': 0,
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
    studentPray: IstudentPray[]
    ads: string[]
    todayPrayContent: string[]
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
                existingPray.date = date
                try {
                    await existingPray.save()

                    existingPray.writer = null;

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

                    todayPray.date = date

                    await todayPray.save()
                    result.ok = true
                    todayPray.writer = null;
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



interface IPostTodayPraySpecificDateParams {
    date?: string
}

interface IpostTodayPraySpecificDateResult {
    ok: boolean
    error: string
    todayPray: ITodayPray
}

export const postTodayPraySpecificDate = async (req: IUserRequest, res: Response) => {
    const { date } = req.params as IPostTodayPraySpecificDateParams
    const { studentPray, ads, todayPrayContent } = req.body as IpostTodayPrayBody
    let result: IpostTodayPraySpecificDateResult = {
        ok: false,
        error: null,
        todayPray: null
    }
    if (date) {
        const dateObj = new Date(parseInt(date))
        const writer = req.user
        const year = dateObj.getFullYear()
        const month = dateObj.getMonth()
        const day = dateObj.getDate()


        try {
            const existingPray = await PrayModel.findOne({
                year,
                month,
                day
            })

            if (existingPray) {

                existingPray.writer = writer
                existingPray.studentPray = studentPray
                existingPray.ads = ads
                existingPray.todayPrayContent = todayPrayContent
                existingPray.date = dateObj
                try {
                    await existingPray.save()
                    existingPray.writer = null
                    result.ok = true
                    result.todayPray = existingPray
                    res.json(result)
                    return;

                } catch (err) {
                    console.error(err)
                    result.error = '새로운 데이터 저장도중 에러발생'
                    res.json(result)
                    return
                }

            } else {
                const newPray = await new PrayModel({
                    year,
                    month,
                    day,
                    writer,
                    studentPray,
                    ads,
                    todayPrayContent
                })

                newPray.date = dateObj

                await newPray.save()
                newPray.writer = null
                result.ok = true
                result.todayPray = newPray
                res.json(result)
                return
            }

        } catch (err) {
            console.error(`${__dirname} ${__filename} err`)
            result.error = "기존에 존재하던 데이터 검색 도충 에러 발생"
            res.json(result)
            return
        }


    } else {
        result.error = "date인자를 전달받지 못하였습니다."
        res.json(result)
        return;
    }
}