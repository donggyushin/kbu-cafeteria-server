import express from 'express'
import { checkUserAuth, checkPrayer } from '../middlewares/authorization'
import { getTodayPray } from '../controllers/todayPray/getTodayPray'
import { postTodayPray, getTodayPrayById, getTodayPrays, postTodayPraySpecificDate } from '../controllers/todayPray'
const router = express.Router()

router.get('/pray/:id', getTodayPrayById)
router.get('/prays/:page', getTodayPrays)
router.get('/:date', getTodayPray)

router.post('/:date', checkUserAuth, checkPrayer, postTodayPraySpecificDate)
router.post('', checkUserAuth, checkPrayer, postTodayPray)

export default router