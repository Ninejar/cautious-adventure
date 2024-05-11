import express from 'express';
import { getAllUsers, getOneUser, signup, login, updateUser, deleteUser, updateInterestedTask, getAllInterestedTasks, deleteInterestedTask } from '../controllers/userController.js';

const router = express.Router();


// Route to show all users
router.get('/',  getAllUsers);

// Route to show one specific user
router.get('/:id', getOneUser);

// Route to create user on signup
router.post('/signup', signup);

// Route to let users log in
router.post('/login', login);

// Route to update a user
router.put('/:id', updateUser);

// Route to delete a user
router.delete('/:id', deleteUser);

router.get('/:userId/interestedTasks/', getAllInterestedTasks);
router.put('/:userId/interestedTasks/:taskId', updateInterestedTask);
router.delete('/:userId/interestedTasks/:taskId', deleteInterestedTask);

export default router;