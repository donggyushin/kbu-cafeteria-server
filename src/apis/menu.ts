import express from 'express'
import { GetMenusOnAMonthly, PutNewMenu, getMenusBasedOnSpecificDate } from '../controllers/menu'
import { checkUserAuth } from '../middlewares/authorization'
const router = express.Router()

// date1 과 date2 사이에 해당하는 모든 menu 오브젝트들을 반환해주는 api
router.get('/menus/:date1/:date2', checkUserAuth, getMenusBasedOnSpecificDate)
// 해당 연과 달에 해당하는 모든 menu 오브젝트들을 반환해주는 api
router.get('/:year/:month', checkUserAuth, GetMenusOnAMonthly)

router.put('', checkUserAuth, PutNewMenu)

export default router