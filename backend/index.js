import express, { response } from "express";
// import {PORT, mongoDBURL} from "./config.js"
import mongoose from 'mongoose'
import journalsRoute from './routes/journalsRoute.js'
import userRoutes from './routes/userRoutes.js';
import cors from 'cors'

import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 8089;
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

app.use('/users', userRoutes);

mongoose.connect(process.env.MONGO_URI)
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