import { Request, Response } from 'express'
import PrayModel from '../../models/todayPray'

export const getTodayPray = async (req: Request, res: Response) => {

    interface IParams {
        date?: string
    }

    const { date } = req.params as IParams

    if (date) {
        const dateObject = new Date(parseInt(date))
        const year = dateObject.getFullYear()
        const month = dateObject.getMonth()
        const day = dateObject.getDate()

        const todayPray = await PrayModel.findOne({
            year,
            month,
            day
        })

        if (todayPray) {
            const { studentPray, ads, todayPrayContent, date } = todayPray
            return res.json({
                studentPray,
                ads,
                todayPrayContent,
                date
            })
        } else {
            res.status(204)
            return res.json({
                message: 'No content'
            })
        }


    } else {
        res.status(422)
        return res.json({
            message: 'date param is missing'
        })
    }
}