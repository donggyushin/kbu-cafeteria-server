import express from 'express'
import { makeNewAccount, UserLoginController } from '../controllers/user'
const router = express.Router()

router.post('/new/account', makeNewAccount)
router.post('/login', UserLoginController)

export default router