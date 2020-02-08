import express from 'express'
import { makeNewAccount, UserLoginController, giveAuthorities } from '../controllers/user'
const router = express.Router()

router.post('/new/account', makeNewAccount)
router.post('/login', UserLoginController)
router.post('/authorities', giveAuthorities)

export default router