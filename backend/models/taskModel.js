import mongoose from 'mongoose';

const taskSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        shortDesc:{
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true
        },
        visibility: {
            type: String, 
            enum: ['Draft', 'Publish'], 
            default: 'Draft',
            required: true
        },
        fileURL: {
            type: [String],
            required: false
        },
        createdBy: {
            type: String,
            required: false
        }
    },
    {
        timestamps: true
    }
);

export const Task = mongoose.model('Task', taskSchema);
