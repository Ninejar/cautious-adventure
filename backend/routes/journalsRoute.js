import express from 'express'
import { Journal } from '../models/journalModel.js'
import auth from '../verifyToken.js'
import jwt from 'jsonwebtoken';
import upload from '../multerSetup.js'

const router = express.Router()

// Route to create a new journal
router.post('/', auth, upload.array('file', 10), async (req, res) => {

    try{
        console.log('Received files:', req.files)
        if (
            !req.body.title ||
            !req.body.content ||
            !req.body.visibility
        ) {
            return res.status(400).send({
                message: 'Send all required fields: title, content, visibility'
            });
        }

        const token = req.header('auth-token'); // Retrieve the token from the request header

        // Decode the token to access the user ID
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        const userId = decodedToken._id; // Accessing the user ID from the decoded token

        const fileURLs = req.files.map(file => file.path);

        const newJournal = {
            title: req.body.title,
            content: req.body.content,
            visibility: req.body.visibility,
            createdBy: userId,
            fileURL: fileURLs
        };

        const journal = await Journal.create(newJournal);

        return res.status(201).send(journal);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

// Route to get all journals from database for a specific user
router.get('/', auth, async (req, res) => {
    try {
        const token = req.header('auth-token'); // Retrieve the token from the request header

        // Decode the token to access the user ID
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        const userId = decodedToken._id; // Accessing the user ID from the decoded token

        // Filter journals based on createdBy field
        const journals = await Journal.find({ createdBy: userId });

        return res.status(200).json({
            count: journals.length,
            data: journals
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

// Route to get a single journal from database by id
router.get('/:id', auth, async (req, res) => {
    try {
        const { id } = req.params;
        const token = req.header('auth-token'); // Retrieve the token from the request header

        // Decode the token to access the user ID
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        const userId = decodedToken._id; // Accessing the user ID from the decoded token

        const journal = await Journal.findById(id);

        if (!journal) {
            return res.status(404).json({ message: 'Journal not found' });
        }

        if (journal.createdBy.toString() !== userId) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        return res.status(200).json({ journal });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

// Route to update a journal
router.put('/:id', auth, upload.array('file', 10), async (req, res) => {
    try {
        const { id } = req.params;
        const token = req.header('auth-token'); // Retrieve the token from the request header

        // Decode the token to access the user ID
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        const userId = decodedToken._id; // Accessing the user ID from the decoded token

        // Fetch the existing journal from the database
        const journal = await Journal.findById(id);

        if (!journal) {
            return res.status(404).json({ message: 'Journal not found' });
        }

        if (journal.createdBy.toString() !== userId) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        if (
            !req.body.title ||
            !req.body.content ||
            !req.body.visibility
        ) {
            return res.status(400).send({
                message: 'Send all required fields: title, content, visibility'
            });
        }

        // If new files are uploaded, use their paths; otherwise, use existing file URLs
        const fileURLs = req.files.length > 0 ? req.files.map(file => file.path) : journal.fileURL;

        const updatedJournal = {
            title: req.body.title,
            content: req.body.content,
            visibility: req.body.visibility,
            createdBy: journal.createdBy,
            fileURL: [...journal.fileURL, ...fileURLs] 
        };

        await Journal.findByIdAndUpdate(id, updatedJournal);

        return res.status(200).send({ message: 'Journal updated successfully' });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});


// Route to delete a journal
router.delete('/:id', auth, async (req, res) => {
    try {
        const { id } = req.params;
        const token = req.header('auth-token'); // Retrieve the token from the request header

        // Decode the token to access the user ID
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        const userId = decodedToken._id; // Accessing the user ID from the decoded token

        const journal = await Journal.findById(id);

        if (!journal) {
            return res.status(404).json({ message: 'Journal not found' });
        }

        if (journal.createdBy.toString() !== userId) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        await Journal.findByIdAndDelete(id);

        return res.status(200).send({ message: 'Journal deleted successfully' });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

export default router;
