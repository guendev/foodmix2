const express = require('express')
const router = express.Router()

const UserController = require('../controllers/user.controller')
const UserValidation = require('../validations/user.validation')
const { validator } = require('../validations/validator')
const AuthMiddleware = require('../middleware/auth.middleware')

/* GET users listing. */
router.get('/', UserValidation.getUsers(), validator, UserController.users)

router.put('/', AuthMiddleware.auth, UserValidation.update(), validator, UserController.update)
router.patch(
    '/',
    AuthMiddleware.auth,
    UserValidation.updatePassword(),
    validator,
    UserController.updatePassword
)

router.get('/me', UserController.getMe)

router.post('/sign-up', UserValidation.createUser(), validator, UserController.create)

router.post('/sign-in', UserValidation.signIn(), validator, UserController.signIn)

router.get('/count', UserController.count)

module.exports = router
