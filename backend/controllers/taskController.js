import { Task } from '../models/taskModel.js';
import jwt from 'jsonwebtoken';
import upload from '../multerSetup.js';

// Create new task
const createTask = async (req, res) => {
    try {
        console.log('Received files:', req.files);
        if (
            !req.body.title ||
            !req.body.content ||
            !req.body.visibility ||
            !req.body.shortDesc
        ) {
            return res.status(400).send({
                message: 'Send all required fields: title, content, visibility'
            });
        }

        const token = req.header('auth-token'); // Retrieve the token from the request header

        // Decode the token to access the user ID
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        const userId = decodedToken._id; // Accessing the user ID from the decoded token

        const fileURLs = req.files.map(file => file.path);

        const newTask = {
            title: req.body.title,
            shortDesc: req.body.shortDesc,
            content: req.body.content,
            visibility: req.body.visibility,
            createdBy: userId,
            fileURL: fileURLs
        };

        const task = await Task.create(newTask);

        return res.status(201).send(task);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
};

// Get all tasks for a specific user
const getUsersTasks = async (req, res) => {
    try {
        const token = req.header('auth-token'); // Retrieve the token from the request header

        // Decode the token to access the user ID
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        const userId = decodedToken._id; // Accessing the user ID from the decoded token

        // Filter tasks based on createdBy field
        const tasks = await Task.find({ createdBy: userId });

        return res.status(200).json({
            count: tasks.length,
            data: tasks
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
};

// Get all published tasks
const getPublishedTasks = async (req, res) => {
    try {
        // Filter tasks based on visibility
        const tasks = await Task.find({ visibility: 'Publish' });

        return res.status(200).json({
            count: tasks.length,
            data: tasks
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
};

// Get one published task
const getPublishedTask = async (req, res) => {
    try {
        // Filter tasks based on visibility
        const { id } = req.params;

        const task = await Task.findById(id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        return res.status(200).json({ task });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
};

// Get a single task by ID
const getOneTask = async (req, res) => {
    try {
        const { id } = req.params;
        const token = req.header('auth-token'); // Retrieve the token from the request header

        // Decode the token to access the user ID
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        const userId = decodedToken._id; // Accessing the user ID from the decoded token

        const task = await Task.findById(id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        if (task.createdBy.toString() !== userId) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        return res.status(200).json({ task });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
};

// Update task
const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const token = req.header('auth-token'); // Retrieve the token from the request header

        // Decode the token to access the user ID
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        const userId = decodedToken._id; // Accessing the user ID from the decoded token

        // Fetch the existing task from the database
        const task = await Task.findById(id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        if (task.createdBy.toString() !== userId) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        if (
            !req.body.title ||
            !req.body.content ||
            !req.body.visibility ||
            !req.body.shortDesc
        ) {
            return res.status(400).send({
                message: 'Send all required fields: title, content, visibility'
            });
        }

        // If new files are uploaded, use their paths; otherwise, use existing file URLs
        const fileURLs = req.files.length > 0 ? req.files.map(file => file.path) : task.fileURL;

        const updatedTask = {
            title: req.body.title,
            shortDesc: req.body.shortDesc,
            content: req.body.content,
            visibility: req.body.visibility,
            createdBy: task.createdBy,
            fileURL: [...task.fileURL, ...fileURLs]
        };

        await Task.findByIdAndUpdate(id, updatedTask);

        return res.status(200).send({ message: 'Task updated successfully' });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
};

// Delete task
const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const token = req.header('auth-token'); // Retrieve the token from the request header

        // Decode the token to access the user ID
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        const userId = decodedToken._id; // Accessing the user ID from the decoded token

        const task = await Task.findById(id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        if (task.createdBy.toString() !== userId) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        await Task.findByIdAndDelete(id);

        return res.status(200).send({ message: 'Task deleted successfully' });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
};

export { createTask, getUsersTasks, getPublishedTasks, getPublishedTask, getOneTask, updateTask, deleteTask };
