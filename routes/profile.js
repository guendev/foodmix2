const express = require('express')
const router = express.Router()

const UserController = require('../controllers/user.controller')
const UserValidation = require('../validations/user.validation')

const { validator } = require('../validations/validator')

/* GET users listing. */
router.get('/:slug', UserController.user)
router.get(
    '/:slug/recipes',
    UserValidation.getProfileProperties(),
    validator,
    UserController.userToRecipes
)

router.get(
    '/:slug/reviews',
    UserValidation.getProfileProperties(),
    validator,
    UserController.userToReviews
)

module.exports = router
