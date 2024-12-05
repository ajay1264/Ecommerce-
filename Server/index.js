//packages 
import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'


//utilites
import connectDB from "./config/db.js"
import exp from 'constants'


dotenv.config();
const port = process.env.PORT || 8000;

connectDB()


const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

app.get('/', (req, res) => {

})

app.listen(port, () => console.log(`Server running on port: ${port}`));
 