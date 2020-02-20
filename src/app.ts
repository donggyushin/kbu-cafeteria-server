import express, { Application } from 'express'
import API from './apis'
import cors from 'cors'
import fs from 'fs'
import dotenv from 'dotenv'
import http from 'http'
import https from 'https'
dotenv.config()

let env = process.env.NODE_ENV || 'dev';

// const key = fs.readFileSync('/etc/letsencrypt/live/kbucard.com/privkey.pem', 'utf8')
// const cert = fs.readFileSync('/etc/letsencrypt/live/kbucard.com/cert.pem', 'utf8')
// const chain = fs.readFileSync('/etc/letsencrypt/live/kbucard.com/chain.pem', 'utf8')

// const credentials = {
//     key,
//     cert,
//     ca: chain
// }

const app: Application = express()
const httpServer = http.createServer(app);
// const httpsServer = https.createServer(credentials, app);
const PORT = process.env.PORT

app.use(cors())
app.use(express.json())
app.use('/api', API)


if (env === 'dev') {
    httpServer.listen(PORT, () => console.log(`kbu-cafeteria-server listening on port ${PORT}`))
} else {
    // httpsServer.listen(PORT, () => console.log(`kbu-cafeteria-server listening on port ${PORT}`))
    httpServer.listen(PORT, () => console.log(`kbu-cafeteria-server listening on port ${PORT}`))
}
