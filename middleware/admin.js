
module.exports.admin = async (req, res, next) => {
    if (!req.user.isAdmin) return res.status(403).send('Your are not allow to access')
    next()
}