import express from 'express'
import auth from '../verifyToken.js'
import { createJournal, getAllJournals, getOneJournal, updateJournal, deleteJournal } from '../controllers/journalController.js'
import upload from '../multerSetup.js'
const router = express.Router()


// Route to create a new journal
router.post('/', auth, upload.array('file', 10), createJournal);

// Route to get all journals from database for a specific user
router.get('/', auth, getAllJournals);

// Route to get a single journal from database by id
router.get('/:id', auth, getOneJournal);

// Route to update a journal
router.put('/:id', auth, upload.array('file', 10), updateJournal);

// Route to delete a journal
router.delete('/:id', auth, deleteJournal);

export default router;
