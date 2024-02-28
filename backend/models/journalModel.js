import mongoose, { mongo } from 'mongoose'

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
    }
    },
    {
        timestamps: true
    }
)

export const Journal = mongoose.model('Journal', journalSchema)