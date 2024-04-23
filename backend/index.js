// index.js
import express from "express";
import mongoose from 'mongoose';
import tasksRoute from './routes/tasksRoute.js';
import journalsRoute from './routes/journalsRoute.js';
import userRoutes from './routes/userRoutes.js';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url); // Get the filename of the current module
const __dirname = path.dirname(__filename); //

const PORT = process.env.PORT || 8089;
const app = express();

// Middleware for parsing req body
app.use(express.json());

// Middleware for handling CORS policy
app.use(cors());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => {
    console.log(req);
    return res.status(234).send('Welcome MERN');
});

app.use('/tasks', tasksRoute);
app.use('/journals', journalsRoute);
app.use('/users', userRoutes);

let server; // Define server outside the scope of app.listen()

if (process.env.NODE_ENV !== 'test') {
    server = app.listen(PORT, () => {
        console.log(`App connected to database!`);
        console.log(`App is listening on port: ${PORT}`);
    });
}

// Exporting the server for testing purposes
export const closeServer = () => {
    if (server) {
        server.close();
    }
};

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log('App connected to database!');
})
.catch((error) => {
    console.log(error);
});

export default app;
