const express = require('express')
const router = express.Router()

const RecipeController = require('../controllers/recipe.controller')
const RecipeValidator = require('../validations/recipe.validation')

const { validator } = require('../validations/validator')

router.get('/', RecipeValidator.getSearch(), validator, RecipeController.search)
router.get('/random', RecipeValidator.getRandom(), validator, RecipeController.random)

module.exports = router
