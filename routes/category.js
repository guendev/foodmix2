const express = require('express')
const router = express.Router()

const CategoryController = require('../controllers/category.controller')
const CategoryValidator = require('../validations/category.validation')

const { validator } = require('../validations/validator')

router.get('/', CategoryController.getAll)
router.get('/:slug', CategoryController.getOne)
router.get('/:slug/count', CategoryController.countRecipe)
router.get(
    '/:slug/recipes',
    CategoryValidator.getRecipes(),
    validator,
    CategoryController.getRecipes
)

module.exports = router
