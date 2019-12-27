import express, { Application } from 'express'
import API from './apis'

const app: Application = express()
app.use(express.json())
app.use('/api', API)

export default app