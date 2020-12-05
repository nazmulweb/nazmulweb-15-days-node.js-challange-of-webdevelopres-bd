const User = require('../models/user');
const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const _ = require('lodash');

module.exports.loginUserController = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user) return res.status(400).send('Unable to login')
        const isMatched = bcrypt.compare(password, user.password)
        if (!isMatched) return res.status(400).send('Unable to login')

        const token = user.generateAuthToken();

        res.cookie("auth", token, {
            httpOnly: true,
            sameSite: true,
            signed: true,
            maxAge: 4 * 60 * 60 * 1000
        })

        res.send('success')

    } catch (err) {
        next(err)
    }
}

module.exports.addUserController = async (req, res, next) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).send({ errors: errors.array() })
    }

    try {
        const foundUser = await User.findOne({ email: req.body.email })
        if (foundUser) return res.status(400).send('User already registered with this email')
        const pickedProperty = _.pick(req.body, ['name', 'email', 'password'])
        const user = new User(pickedProperty)
        await user.save()
        res.send({
            name: user.name,
            email: user.email
        })
    } catch (err) {
        next(err)
    }
}

module.exports.getUsersController = async (req, res, next) => {
    try {
        const users = await User.find({}, '-password')
        return res.status(200).send(users)
    } catch (err) {
        next(err)
    }
}

module.exports.getUserController = async (req, res, next) => {
    const error = validationResult(req)
    if (!error.isEmpty()) return res.status(400).send(error)
    try {
        const id = req.params.id
        const user = await User.findById(id, "-password")
        if (!user) return res.status(404).send('user not found!')
        return res.send(user)
    } catch (err) {
        next(err)
    }
}


module.exports.updateUserController = async (req, res, next) => {
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
        const user = await User.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true
        })
        if (!user) return res.status(404).send('user not found')
        res.send(user)
    } catch (err) {
        next(err)
    }
}

module.exports.deleteUserController = async (req, res, next) => {

    const id = req.params.id;

    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(404).send({ errors: errors.array() })

    try {
        const user = await User.findByIdAndDelete(id)
        if (!user) return res.send('No user found')
        res.send(user)
    } catch (err) {
        next(err)
    }
}

module.exports.getMeController = async (req, res, next) => {
    // const error = validationResult(req)
    // if (!error.isEmpty()) return res.status(400).send(error)
    try {
        const id = req.user.id
        const user = await User.findById(id, "-password")
        if (!user) return res.status(404).send('user not found!')
        return res.send(user)
    } catch (err) {
        next(err)
    }
}

module.exports.logOutController = (req, res) => {
    res.clearCookie('auth')
    res.send('User logout successfully!')
}