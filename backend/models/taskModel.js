const mongoose = require('mongoose');

const taskSchema = mongoose.Schema(
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

module.exports = mongoose.model('Task', taskSchema);
