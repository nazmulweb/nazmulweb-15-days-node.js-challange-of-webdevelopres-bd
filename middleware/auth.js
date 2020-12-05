const jwt = require('jsonwebtoken')
const User = require('../models/user')

module.exports.auth = async (req, res, next) => {
    if (req.signedCookies) {
        // access token 
        const token = req.signedCookies['auth']
        try {
            const decoded = jwt.verify(token, process.env.COOKIE_SECRET)
            const user = await User.findById(decoded.id)
            req.user = user
            next()
        } catch (e) {
            res.status(401).send('Unauthorized token')
        }
    } else {
        res.status(401).send('Unauthorized token')
    }
}