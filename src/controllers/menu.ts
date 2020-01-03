import { Request, Response } from 'express'
import { IMenu } from '../types'
import MenuModel from '../models/menu'
import dotenv from 'dotenv'
dotenv.config()

interface IPutNewMenuResponse {
    ok: boolean
    error: string
    menu: IMenu
}

export const PutNewMenu = async (req: Request, res: Response) => {

    // 추후에 관리자가 아닌 클라이언트가 요청을 보내면 무시하는 미들웨어를 추가해주어야함. 


    const newMenu: IMenu = req.body.menu


    let result: IPutNewMenuResponse = {
        ok: true,
        error: null,
        menu: null
    }

    try {
        const menu = await MenuModel.findById(newMenu._id)
        menu.lunch.menus = newMenu.lunch.menus
        menu.dinner.menus = newMenu.dinner.menus
        await menu.save()
        result.menu = menu
        res.json(result)
        return
    } catch (err) {
        console.error(`Error occured at [${__dirname}]: ${err}`)
        result.ok = false
        result.error = '메뉴를 변경하던 도중에 에러가 발생함. 관리자에게 문의 부탁'
        res.json(result)
        return
    }



}





interface IGetMenusOnAMonthly {
    ok: boolean
    error: string
    menus: IMenu[]
}

export const GetMenusOnAMonthly = async (req: Request, res: Response): Promise<void> => {
    // TODO: 추후에 유효한 token 없이 요청을 하는 클라이언트는 튕궈내 버리는 middleware
    // 추가


    let result: IGetMenusOnAMonthly = {
        ok: true,
        error: null,
        menus: []
    }

    const { year, month } = req.params
    // 해당 년도와 해당 월에 총 몇일이 존재하는지 알아낸다. 
    let parsedYear: number = parseInt(year)
    let parsedMonth: number = parseInt(month)
    const menuObjects: IMenu[] = []
    const days: number = 32 - new Date(parsedYear, parsedMonth, 32).getDate()
    // 해당 일수만큼 반복을 하여서 데이터베이스에서 menu instance 들을 불러온다. 만약에
    // 존재하지 않는 instance 라면 새로 만들어주고 불러온다. 
    try {

        for (let index = 0; index < days; index++) {

            const menu: IMenu = await MenuModel.findOne({
                year,
                month,
                day: index + 1
            })

            if (menu) {
                menuObjects.push(menu)
            } else {
                const dinner = {
                    menus: []
                }
                const lunch = {
                    menus: []
                }
                const newMenu = await new MenuModel({
                    year,
                    month,
                    day: index + 1,
                    dinner,
                    lunch
                })

                await newMenu.save()
                menuObjects.push(newMenu)
            }

        }

        // 그렇게 instance 들을 menuObecjts 라는 배열에 담아주고 
        // 반환해준다
        result.menus = menuObjects
        res.json(result)
        return
    } catch (err) {
        console.error(`Error occured at:[${__dirname}]: ${err.message}`)
        result.ok = false
        result.error = `internal error`,
            res.json(result)
        return
    }

}