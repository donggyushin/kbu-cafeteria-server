import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

let endpoint = process.env.DEV_MONGODB_URL


let env = process.env.NODE_ENV
if (env === 'docker') {
    endpoint = process.env.DOCKER_MONGODB_URL
} else if (env = 'production') {
    endpoint = process.env.PROD_MONGODB_URL
}



mongoose.connect(endpoint, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error'))
db.once('open', function () {
    console.log('Database connected successfully')
})
