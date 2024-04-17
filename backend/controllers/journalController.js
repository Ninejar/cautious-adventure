import { Journal } from '../models/journalModel.js'

// Create a new journal
const createJournal = async (req,res) => {
    try{
        if (
            !req.body.title ||
            !req.body.content ||
            !req.body.visibility
        ) {
            return res.status(400).send({
                message: 'Send all required fields: title, content, visibility'
            });
        }

        if (!req.files) {
            req.files = [];
        }

        const fileURLs = req.files.map(file => file.path);

        const newJournal = {
            title: req.body.title,
            content: req.body.content,
            visibility: req.body.visibility,
            createdBy: req.user._id,
            fileURL: fileURLs
        };

        const journal = await Journal.create(newJournal);

        return res.status(201).send(journal);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
}

// Get all journals from database for a specific user
const getAllJournals = async (req, res) => {
    try {
        // Filter journals based on createdBy field
        const journals = await Journal.find({ createdBy: req.user._id });

        return res.status(200).json({
            count: journals.length,
            data: journals
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
}

// Get a single journal from database by id
const getOneJournal = async (req, res) => {
    try {
        const { id } = req.params;

        const journal = await Journal.findById(id);

        if (!journal) {
            return res.status(404).json({ message: 'Journal not found' });
        }

        if (journal.createdBy.toString() !== req.user._id) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        return res.status(200).json({ journal });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
}

// Update a journal
const updateJournal = async (req, res) => {
    try {
        const { id } = req.params;

        // Fetch the existing journal from the database
        const journal = await Journal.findById(id);

        if (!journal) {
            return res.status(404).json({ message: 'Journal not found' });
        }

        if (journal.createdBy.toString() !== req.user._id) {
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
}

// Delete a journal
const deleteJournal = async (req, res) => {
    try {
        const { id } = req.params;
        const journal = await Journal.findById(id);

        if (!journal) {
            return res.status(404).json({ message: 'Journal not found' });
        }

        if (journal.createdBy.toString() !== req.user._id) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        await Journal.findByIdAndDelete(id);

        return res.status(200).send({ message: 'Journal deleted successfully' });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
}

export { createJournal, getAllJournals, getOneJournal, updateJournal, deleteJournal }