const AuthController = require('../controllers/auth.controller')

module.exports = async (req, res, next) => {
    const token = req.headers.authorization || ''
    let user = undefined
    if (token) {
        user = await AuthController.getUser(token.replace('Bearer ', ''))
    }
    req.user = user
    next()
}
