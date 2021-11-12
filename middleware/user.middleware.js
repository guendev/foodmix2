const AuthController = require('../controllers/auth.controller')

module.exports = async (req, res, next) => {
    let user = undefined
    if (req.cookies._token) {
        user = await AuthController.getUser(req.cookies._token)
    }
    req.user = user
    next()
}
