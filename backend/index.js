import express, { response } from "express";
import {PORT, mongoDBURL} from "./config.js"
import mongoose from 'mongoose'
import journalsRoute from './routes/journalsRoute.js'
import cors from 'cors'

const app = express() 


// Middleware for parsing req body
app.use(express.json())

// Middleware for handling CORS policy
app.use(cors())


app.get('/', (req, res) => {
    console.log(req)
    return res.status(234).send('Welcome MERN')
})

app.use('/journals', journalsRoute)

mongoose.connect(mongoDBURL)
.then(() => {
    console.log('App connected to database!')
    app.listen(PORT,  () => {
        console.log(`app is listening to port: ${PORT}`)
    })
})
.catch((error) => {
    console.log(error)
})
