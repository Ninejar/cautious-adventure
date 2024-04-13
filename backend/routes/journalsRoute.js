import express from 'express'
import { Journal } from '../models/journalModel.js'
import auth from '../verifyToken.js'

const router = express.Router()



// Route to create a new journal
router.post('/', auth, async (req, res) => {
    try{
        if (
            !req.body.title || 
            !req.body.content ||
            !req.body.visibility
        ) {
            return res.status(400).send({
                message: 'Send all required fields, title, content, visibility'
            })
        }

        const newJournal = {
            title: req.body.title,
            content: req.body.content,
            visibility: req.body.visibility
        }

        const journal = await Journal.create(newJournal)

        return res.status(201).send(journal)
        
    } catch (error){
        console.log(error.message)
        res.status(500).send({message: error.message})

    }
})

// Route to get all journals from database
router.get('/', auth, async (req, res) => {
    try{
        const journals = await Journal.find({})
        return res.status(200).json({
            count: journals.length,
            data: journals
        })
    } catch (error){
        console.log(error.message)
        res.status(500).send({message: error.message})
         
    }
})

// Route to get a single journal from database by id
router.get('/:id', async (req, res) => {
    try{

        const {id} = req.params  
        const journal = await Journal.findById(id)
        return res.status(200).json({journal})
    } catch (error){
        console.log(error.message)
        res.status(500).send({message: error.message})
         
    }
})

// Route to update a journal
router.put('/:id', async (req, res) => {
    try {
        if (
            !req.body.title || 
            !req.body.content ||
            !req.body.visibility
        ) {
            return res.status(400).send({
                message: 'Send all required fields: title, content'
            })
        }

        const {id} = req.params

        const result = await Journal.findByIdAndUpdate(id, req.body)
        
        if(!result){
            return res.status(404).json({message: 'journal not found'})
        }

        return res.status(200).send({message: 'journal updated successfully'})
    } catch (error){
        console.log(error.message)
        res.status(500).send({ message: error.message})
    }
})

// Route to delete a journal
router.delete('/:id', async (req, res) => {
    try{
        const {id} = req.params

        const result = await Journal.findByIdAndDelete(id)

        if(!result){
            return res.status(401).json({message: 'journal not found'})
        }

        return res.status(200).send({message: 'journal deleted successfully'})
    } catch (error){
        console.log(error.message)
        res.status(500).send({message: error.message})
    } 
})

 export default router