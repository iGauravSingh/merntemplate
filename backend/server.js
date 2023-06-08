const express = require('express')
const dotenv = require('dotenv').config()
const connectDB = require('./config/db')
const colors = require('colors')
const cors = require('cors')
const { errorHandler } = require('./middleware/errorMiddleware')


connectDB()

const app = express()

app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/',(req,res)=>{
    res.send('hello')
})

app.use('/user',require('./routes/userRoutes'))

app.use(errorHandler)

const PORT = process.env.PORT || 4000

app.listen(PORT,()=>{console.log(`listening on port ${PORT}`)})