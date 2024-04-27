import mongoose, { mongo } from 'mongoose'

const userSchema = mongoose.Schema(
    {
        fName:{
            type: String,
            required:true,
            maxLength: 50

        },
        lName:{
            type: String,
            required:true,
            maxLength: 50
        },
        email:{
            type: String,
            required:true,
            unique: true,
            match: /^\S+@\S+\.\S+$/,
            maxLength: 62

        },
        password:{
            type: String,
            required:true,
            minLength: 8
        },
        role: { 
            type: String,
            enum: ["student", "teacher"],
            required: true },
        // role: { 
        //     type: String,
        //     enum: ["user", "admin"],
        //     default: "user",
        //     lowercase: true,
        //     required: true },
        date:{
            type: Date,
            default: Date.now
        }
    }
)

export const User = mongoose.model('User', userSchema)
