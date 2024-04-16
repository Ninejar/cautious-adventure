import mongoose from 'mongoose';

const journalSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
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
        }
    },
    {
        timestamps: true
    }
);

export const Journal = mongoose.model('Journal', journalSchema);
