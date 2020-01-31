import express from 'express'
import { checkUserAuth, checkPrayer } from '../middlewares/authorization'
import { postTodayPray, getTodayPray } from '../controllers/todayPray'
const router = express.Router()

router.get('/:date', getTodayPray)

router.post('/:date', checkUserAuth, checkPrayer, postTodayPray)
router.post('', checkUserAuth, checkPrayer, postTodayPray)

export default router