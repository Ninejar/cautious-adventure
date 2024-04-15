import mongoose, { mongo } from 'mongoose'

const userSchema = mongoose.Schema(
    {
        fName:{
            type: String,
            required:true
        },
        lName:{
            type: String,
            required:true
        },
        email:{
            type: String,
            required:true,
        },
        password:{
            type: String,
            required:true,
        min:8
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


