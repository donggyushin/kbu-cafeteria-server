import express, { Application } from 'express'
import API from './apis'
import cors from 'cors'

const app: Application = express()
app.use(cors())
app.use(express.json())
app.use('/api', API)

export default app