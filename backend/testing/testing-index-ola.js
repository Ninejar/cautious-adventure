import express, { response } from "express";
import {baseURL, parameters} from "../config.js";
import mongoose from 'mongoose'
import journalsRoute from '../routes/journalsRoute.js'
import userRoutes from '../routes/userRoutes.js';
import cors from 'cors'
import path from 'path';
import { fileURLToPath } from 'url';

const PORT = 2401;
const database = "olanskTestDB";
const MONGO_URI = `${baseURL}/${database}?${parameters}`;

import dotenv from 'dotenv';
dotenv.config();

const __filename = fileURLToPath(import.meta.url); // Get the filename of the current module
const __dirname = path.dirname(__filename); //

const app = express() 


// Middleware for parsing req body
app.use(express.json())

// Middleware for handling CORS policy
app.use(cors()) 

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/journals', journalsRoute)

app.use('/users', userRoutes);

mongoose.connect(MONGO_URI)
.then(() => {
    // console.log('App connected to database!')
    app.listen(PORT,  () => {
        // console.log(`app is listening to port: ${PORT}`)
    })
})
.catch((error) => {
    console.log(error)
});

export default app;