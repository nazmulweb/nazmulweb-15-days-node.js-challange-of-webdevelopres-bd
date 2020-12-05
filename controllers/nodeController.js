const Note = require('../models/notes');
const { validationResult } = require('express-validator')


module.exports.addNoteController = async (req, res, next) => {


    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).send({ errors: errors.array() })
    }

    try {
        const note = new Note({ ...req.body, woner: req.user.id })
        await note.save()
        res.send(note)
    } catch (err) {
        next(err)
    }
}

module.exports.getNotesController = async (req, res, next) => {
    try {
        const notes = await Note.find().populate('woner', 'name')
        return res.send(notes)
    } catch (err) {
        next(err)
    }
}

module.exports.getNoteController = async (req, res, next) => {
    console.log(req.user)
    const error = validationResult(req)
    if (!error.isEmpty()) return res.status(400).send(error)
    try {
        const id = req.params.id
        const note = await Note.findById(id).populate('woner', 'name')
        if (!note) return res.status(404).send('Note not found!')
        return res.send(note)
    } catch (err) {
        next(err)
    }
}


module.exports.updateNoteController = async (req, res, next) => {
    const id = req.params.id;
    const { title, description } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).send({ errors: errors.array() })
    /*
    const  updates  =  Object.keys(req.body)
    const  allowedUpdates  = ['title', 'description']
    const  isValidOperation  =  updates.every((update) =>  allowedUpdates.includes(update))
    if (!isValidOperation) return  res.status(400).send('Invalid updates!')
    */
    const data = {
        title,
        description
    }

    try {
        const note = await Note.findOneAndUpdate({ _id: id, woner: req.user.id }, data, {
            new: true,
            runValidators: true
        })
        if (!note) return res.status(404).send('Note not found')
        res.send(note)
    } catch (err) {
        next(err)
    }
}

module.exports.deleteNoteController = async (req, res, next) => {

    const id = req.params.id;

    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(404).send({ errors: errors.array() })

    try {
        const note = await Note.findOneAndDelete({ _id: id, woner: req.user.id })
        if (!note) return res.send('No note found')
        res.send(note)
    } catch (err) {
        next(err)
    }
}