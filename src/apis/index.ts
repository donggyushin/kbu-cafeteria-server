import express from 'express'
import user from './user'
import menu from './menu'
const router = express.Router()

router.use('/user', user)
router.use('/menu', menu)

export default router