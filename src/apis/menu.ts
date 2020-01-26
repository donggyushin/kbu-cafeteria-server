import express from 'express'
import { GetMenusOnAMonthly, PutNewMenu, getMenusBasedOnSpecificDate, getSpecificOneMenuBasedOnDate } from '../controllers/menu'
import { checkUserAuth } from '../middlewares/authorization'
const router = express.Router()
// date 값은 해당 날짜를 miliseconds 단위로 반환한 값이다. 


// 특정 date 값을 받아와서 해당 날에 해당하는 menu 오브젝트를 반환해주는 api    
router.get('/menu/:date', getSpecificOneMenuBasedOnDate)

// date1 과 date2 사이에 해당하는 모든 menu 오브젝트들을 반환해주는 api
router.get('/menus/:date1/:date2', getMenusBasedOnSpecificDate)
// 해당 연과 달에 해당하는 모든 menu 오브젝트들을 반환해주는 api
router.get('/:year/:month', GetMenusOnAMonthly)


router.put('', checkUserAuth, PutNewMenu)

export default router