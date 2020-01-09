import dotenv from 'dotenv'
import './database'
import App from './app'
dotenv.config()

const PORT = process.env.PORT

App.listen(PORT, () => console.log(`KBU Cafeteria Web server is listening on port ${PORT}`))