import express from 'express';
import auth from '../verifyToken.js';
import upload from '../multerSetup.js';
import { createTask, getUsersTasks, getPublishedTasks, getPublishedTask, getOneTask, updateTask, deleteTask } from "../controllers/taskController.js"

const router = express.Router();

// Route to create a new task
router.post('/', auth, upload.array('file', 10), createTask);

// Route to get all tasks from the database for a specific user
router.get('/', auth, getUsersTasks);

router.get('/published', getPublishedTasks);

router.get('/published/:id', getPublishedTask);

// Route to get a single task from the database by ID
router.get('/:id', auth, getOneTask);

// Route to update a task
router.put('/:id', auth, upload.array('file', 10), updateTask);

// Route to delete a task
router.delete('/:id', auth, deleteTask);

export default router;
