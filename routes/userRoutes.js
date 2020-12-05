const express = require('express')
const { check, param } = require('express-validator');
const { auth } = require('../middleware/auth')
const { admin } = require('../middleware/admin')
const {
    getUserController,
    getUsersController,
    addUserController,
    updateUserController,
    deleteUserController,
    loginUserController,
    getMeController,
    logOutController } = require('../controllers/userController')
const router = express.Router()


// login user 

router.post('/login', [
    check('email', 'Email must be reqired').notEmpty(),
    check('email', 'Enter a valid email').isEmail(),
    check('password', 'Password must be required').notEmpty(),
    check('password', 'Password must be minimum 6 characters').isLength({ min: 6 }),
], loginUserController)

// get all notes
router.get('/', [auth, admin], getUsersController)

// get single note
router.get('/me', auth, getMeController)


// get single note
router.get('/:id', check('id', 'User not found with this id').isMongoId(), getUserController)

//add note
router.post('/',
    [
        check('name', 'Name must be required').notEmpty(),
        check('email', 'Emial must be required').notEmpty(),
        check('email', 'Enter a valid email').isEmail(),
        check('password', 'Password must be required').notEmpty(),
        check('password', 'Password must be minimum 6 characters').isLength({ min: 6 }),
        check('password').custom((value, { req }) => {
            if (value !== 'password') {
                return true
            } else {
                throw new Error('Password must not contain "password"')
            }
        }),
        check('confirmPassword', 'Confirm password is reqired').notEmpty(),
        check('confirmPassword').custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error("Password dosen't match with confirm password")
            } else {
                return true
            }
        })
    ],
    addUserController
)

// update note 
router.put('/:id', [
    param('id', 'User not found with this id').isMongoId(),
    check('name', 'Name must be required').optional().notEmpty(),
    check('emial', 'email must be required').optional().notEmpty(),
    check('password', 'password must be required').optional().notEmpty(),
], updateUserController)


// delete note 
router.delete('/:id', check('id', "No user found with this id").isMongoId(), deleteUserController)

// logou user 
router.post('/logout', auth, logOutController)


module.exports = router
