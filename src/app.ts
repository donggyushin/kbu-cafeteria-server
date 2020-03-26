import express, { Application } from 'express'
import API from './apis'
import cors from 'cors'
import fs from 'fs'
import dotenv from 'dotenv'
import http from 'http'
import https from 'https'
dotenv.config()

let env = process.env.NODE_ENV || 'dev';


let key = "";
let cert = "";
let chain = "";

if (env === 'docker') {

    key = fs.readFileSync('/usr/src/app/dist/keys/privkey.pem', 'utf8')
    cert = fs.readFileSync('/usr/src/app/dist/keys/cert.pem', 'utf8')
    chain = fs.readFileSync('/usr/src/app/dist/keys/chain.pem', 'utf8')
} else if (env === 'production') {
    key = fs.readFileSync('/etc/letsencrypt/live/api.kbucard.com/privkey.pem', 'utf8')
    cert = fs.readFileSync('/etc/letsencrypt/live/api.kbucard.com/cert.pem', 'utf8')
    chain = fs.readFileSync('/etc/letsencrypt/live/api.kbucard.com/chain.pem', 'utf8')
}



const credentials = {
    key,
    cert,
    ca: chain
}

const app: Application = express()
const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);
const PORT = process.env.PORT

app.use(cors())
app.use(express.json())
app.use('/api', API)


if (env === 'dev') {
    httpServer.listen(PORT, () => console.log(`kbu-cafeteria-server listening on port ${PORT}`))

} else if (env === 'docker') {
    httpsServer.listen(PORT, () => console.log(`[HTTPS]kbu-cafeteria-server listening on port ${PORT}`))
} else if (env === 'production') {
    httpsServer.listen(PORT, () => console.log(`[HTTPS]kbu-cafeteria-server listening on port ${PORT}`))
}
