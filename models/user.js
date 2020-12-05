const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const { Schema } = mongoose

const usersSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            validate: {
                validator(value) {
                    return validator.isEmail(value)
                },
                message: "Email must be a valid email"
            }
        },
        isAdmin: {
            type: Boolean,
            default: false
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
            validate: {
                validator(value) {
                    return !value.toLowerCase().includes('password');
                },
                message: 'Password must not contain "password"'
            }
        },
    },
    {
        timestamps: true
    });

usersSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ id: this._id, isAdmin: this.isAdmin }, process.env.COOKIE_SECRET, { expiresIn: "4h" })
    return token;
}

usersSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt)
    this.password = hashedPassword
    next()
})


const User = mongoose.model('User', usersSchema)
module.exports = User