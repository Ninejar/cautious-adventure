import express from 'express'
import { User } from '../models/userModel.js'
import { check, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = express.Router()



// Route to show all users
router.get('/',  async (req, res) => {
    try {
        // Find all users in the database
        const showUsers = await User.find()
        res.json(showUsers)
        // Provide error message
    } catch (error){
        res.json(error)
    }
})

// Route to show one specific user (Read)
router.get('/:id', async (req, res) => {
    try {
        // Find one user by the ID
        const showUser = await User.find({_id: req.params.id})
        res.json(showUser)
        // Provide error message
    } catch (error){
        res.json(error)
    }
    
})

router.post('/signup', async (req, res) =>{
    // check if user already exists
    const emailExists = await User.findOne({email: req.body.email})

    if(emailExists){
        return res.status(400).send('email already exists')
    }

    // encrypt password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password:hashedPassword,
        position: req.body.position,
        date: req.body.date
    })

    // save user
    try{
                // Save the new user to database
                const saveUser = await newUser.save()
                res.send('User created')
                // res.send(saveUser)
                // Provide error message
            } catch (error){
                res.status(400).send(error)
            }
})


// login 
router.post('/login', async (req, res) => {
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
        const token = jwt.sign({ _id: user._id, role: user.role }, process.env.TOKEN_SECRET, { expiresIn: '5m' }); //EXPIRATION
        res.json({ token });
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// PUT a new user (Update)
router.put('/:id', async (req, res) => {
    try{
        const updUser = 
        await User.updateOne({
                _id:req.params.id},
            {$set:{
                fname: req.body.fname,
                lname:req.body.lname,
                email: req.body.email,
                university: req.body.university,
                department: req.body.department,
                position: req.body.position
            }})
        res.json(updUser)
        // Provide error message
    } catch (error){
        res.status(400).json({message: error})
    }
})

// DELETE a user (Delete)
router.delete('/:id', async (req, res) => {
    try{
        const delUser = await User.deleteOne({_id:req.params.id})
        res.json({message: `user deleted with id ${req.params.id}`})
        // Provide error message
    } catch (error){
        res.status(400).json({message: error})
    }
    
})

export default router