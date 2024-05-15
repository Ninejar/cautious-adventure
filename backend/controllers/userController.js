import { User } from '../models/userModel.js'
import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Task } from '../models/taskModel.js'; 


// Show all users
const getAllUsers = async (req, res) => {
    try {
        // Find all users in the database
        const showUsers = await User.find()
        res.json(showUsers)
        // Provide error message
    } catch (error){
        res.json(error)
    }
}

// Show one specific user
const getOneUser = async (req, res) => {
    try {
        // Find one user by the ID
        const showUser = await User.find({_id: req.params.id})
        res.json(showUser)
        // Provide error message
    } catch (error){
        res.json(error)
    }
}

// Sign up
const signup = async (req, res) => {
    // check if user already exists
    const emailExists = await User.findOne({email: req.body.email})

    if(emailExists){
        return res.status(400).send('Email already exists.')
    }

    if (!req.body.fName) {
        return res.status(400).send('Please enter your first name.');
    }

    if (!req.body.lName) {
        return res.status(400).send('Please enter your last name.');
    }

    if (!req.body.email) {
        return res.status(400).send('Please enter your email.');
    }

    if (!req.body.password) {
        return res.status(400).send('Please choose a password');
    }

    if (!req.body.role) {
        return res.status(400).send('You must choose a role.');
    }

    if (req.body.role, req.body.password, req.body.email, req.body.lName, req.body.fName){
        if (!req.body.email.match(/^\S+@\S+\.\S+$/)) {
            return res.status(400).send('Invalid email format (example@email.x)');
        }

        if (req.body.password.length < 8){
            return res.status(400).send('Password must be at least 8 characters.');
        }
    }


    // encrypt password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    const newUser = new User({
        fName: req.body.fName,
        lName: req.body.lName,
        email: req.body.email,
        password:hashedPassword,
        role: req.body.role,
        date: req.body.date
    })

    // save user
    try{
        // Save the new user to database
        const saveUser = await newUser.save()
        res.send(saveUser)
        // res.send(saveUser)
        // Provide error message
    } catch (error){
        res.status(400).send(error)
    }
}

// Log in
const login = async (req, res) => {
    try {
        // validation
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        // check if email exists
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).send('Email could not be found in the database');
        }
        // check if password is matched
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.status(400).send('Invalid password');
        }
        // create jwt and send it
        if (!process.env.TOKEN_SECRET) {
            throw new Error('TOKEN_SECRET is not defined');
        }
        const token = jwt.sign({ _id: user._id, role: user.role, fName: user.fName, lName: user.lName}, process.env.TOKEN_SECRET); //EXPIRATION
        res.json({ token });
    } catch (error) {
        res.status(400).send(error.message);
    }
}

// Update a user
const updateUser = async (req, res) => {
    try{
        const updUser = 
        await User.updateOne({
                _id:req.params.id},
            {$set:{
                fName: req.body.fName,
                lName:req.body.lName,
                email: req.body.email,
                university: req.body.university,
                department: req.body.department,
                role: req.body.role
            }})
        res.json(updUser)
        // Provide error message
    } catch (error){
        res.status(400).json({message: error})
    }
}

// Delete a user
const deleteUser = async (req, res) => {
    try{
        const delUser = await User.deleteOne({_id:req.params.id})
        res.json({message: `user deleted with id ${req.params.id}`})
        // Provide error message
    } catch (error){
        res.status(400).json({message: error})
    }
}

const updateInterestedTask = async (req, res) => {
    try {
        const { userId, taskId } = req.params;

        // Find the user by ID and update interestedTasks array
        const updatedUser = await User.findByIdAndUpdate(userId, { $addToSet: { interestedTasks: taskId } }, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({ message: 'Task added to interestedTasks successfully', user: updatedUser });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
};

const getAllInterestedTasks = async (req, res) => {
    try {
      const { userId } = req.params;
  
      // Find the user by ID
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Get the interestedTasks array from the user document
      const interestedTaskIds = user.interestedTasks;
  
      // Fetch the details of all interested tasks
      const interestedTasks = await Task.find({ _id: { $in: interestedTaskIds } });
  
      return res.status(200).json({ interestedTasks });
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ message: error.message });
    }
  };

  const deleteInterestedTask = async (req, res) => {
    try {
      const { userId, taskId } = req.params;
  
      // Find the user by ID and update interestedTasks array to remove the specified task ID
      const updatedUser = await User.findByIdAndUpdate(userId, { $pull: { interestedTasks: taskId } }, { new: true });
  
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      return res.status(200).json({ message: 'Task removed from interestedTasks successfully', user: updatedUser });
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ message: error.message });
    }
  };

export { getAllUsers, getOneUser, signup, login, updateUser, deleteUser,updateInterestedTask, getAllInterestedTasks, deleteInterestedTask }