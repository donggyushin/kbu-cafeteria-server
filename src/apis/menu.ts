import express from 'express'
import { GetMenusOnAMonthly } from '../controllers/menu'
const router = express.Router()

// 해당 연과 달에 해당하는 모든 menu 오브젝트들을 반환해주는 api
router.get('/:year/:month', GetMenusOnAMonthly)

export default router