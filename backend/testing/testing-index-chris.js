import express, { response } from "express";
import {PORT, baseURL, parameters} from "../config.js";
import mongoose from 'mongoose'
import tasksRoute from '../routes/tasksRoute.js'
import journalsRoute from '../routes/journalsRoute.js'
import userRoutes from '../routes/userRoutes.js';
import cors from 'cors'
import path from 'path';
import { fileURLToPath } from 'url';

const database = "chris-testing-db";
const MONGO_URI = `${baseURL}/${database}?${parameters}`;


import dotenv from 'dotenv';
dotenv.config();

const __filename = fileURLToPath(import.meta.url); // Get the filename of the current module
const __dirname = path.dirname(__filename); //

// const PORT = PORT || 8089;
const app = express() 


// Middleware for parsing req body
app.use(express.json())

// Middleware for handling CORS policy
app.use(cors()) 

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/tasks', tasksRoute)

app.use('/journals', journalsRoute)

app.use('/users', userRoutes);

mongoose.connect(MONGO_URI)
.then(() => {
    app.listen(0)
})
.catch((error) => {
    console.log(error)
});

export default app;

