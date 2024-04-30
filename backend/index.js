import express, { response } from "express";
import {PORT, baseURL, database, parameters} from "./config.js";
import mongoose from 'mongoose'
import tasksRoute from './routes/tasksRoute.js'
import journalsRoute from './routes/journalsRoute.js'
import userRoutes from './routes/userRoutes.js';
import cors from 'cors'
import path from 'path';
import { fileURLToPath } from 'url';

const MONGO_URI = `${baseURL}/${database}?${parameters}`


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

app.get('/', (req, res) => {
    console.log(req)
    return res.status(234).send('Welcome MERN')
})

app.use('/tasks', tasksRoute)

app.use('/journals', journalsRoute)

app.use('/users', userRoutes);

mongoose.connect(MONGO_URI)
.then(() => {
    console.log('App connected to database!')
    app.listen(PORT,  () => {
        console.log(`app is listening to port: ${PORT}`)
    })
})
.catch((error) => {
    console.log(error)
});

// handling graceful shutdown
function quit(eType){
	console.log(`Received ${eType} signal. Expressjs Graceful shutdown.`);
	server.close(()=>{
		console.log("Express server closed.");
		process.exit();
	});
	
}
['SIGINT', 'SIGQUIT', 'SIGTERM'].forEach(eType=>{console.log("Attaching for ", eType); process.on(eType, quit);});

export { app }; // Export the app object