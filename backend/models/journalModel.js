import mongoose from 'mongoose';

const journalSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            maxLength: 64
        },
        content: {
            type: String,
            required: true
        },
        visibility: {
            type: String, 
            enum: ['Private', 'Public'], 
            default: 'Private',
            required: true
        },
        createdBy: {
            type: String,
            required: false
        },
        fileURL: {
            type: [String],
            required: false
        },
        taskId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Task',
            required: false
        }
    },
    {
        timestamps: true
    }
);

export const Journal = mongoose.model('Journal', journalSchema);
