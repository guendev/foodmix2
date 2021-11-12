const express = require('express')
const router = express.Router()

const UserController = require('../controllers/user.controller')
const UserValidation = require('../validations/user.validation')
const { validator } = require('../validations/validator')

/* GET users listing. */
router.get(
    '/',
    UserValidation.getUsersValidator(),
    validator,
    UserController.users
)

module.exports = router
