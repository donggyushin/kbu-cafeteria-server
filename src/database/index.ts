import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

let endpoint = process.env.DEV_MONGODB_URL


let env = process.env.NODE_ENV
console.log('env:', env)

if (env === 'docker') {
    endpoint = process.env.PROD_MONGODB_URL
    console.log('1')
} else if (env == 'production') {
    endpoint = process.env.PROD_MONGODB_URL
    console.log('2')
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
