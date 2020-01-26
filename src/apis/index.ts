import express from 'express'
import user from './user'
import menu from './menu'
import todayPray from './todayPray'
const router = express.Router()

router.use('/user', user)
router.use('/menu', menu)
router.use('/todaypray', todayPray)

export default router