import express from 'express'
import { makeNewAccount } from '../controllers/user'
const router = express.Router()

router.post('/new/account', makeNewAccount)

export default router