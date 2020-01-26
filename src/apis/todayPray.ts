import express from 'express'
import { checkUserAuth } from '../middlewares/authorization'
import { postTodayPray, getTodayPray } from '../controllers/todayPray'
const router = express.Router()

router.post('', checkUserAuth, postTodayPray)
router.get('/:date', getTodayPray)

export default router