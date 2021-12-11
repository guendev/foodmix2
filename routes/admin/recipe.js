const express = require('express')
const router = express.Router()

const RecipeValidator = require('../../validations/admin/recipe.validation')
const RecipeController = require('../../controllers/admin/recipe.controller')

const { validator } = require('../../validations/validator')

router.get('/', RecipeValidator.getRecipes(), validator, RecipeController.recipes)
router.post('/', RecipeValidator.updateRecipe(), validator, RecipeController.update)

router.post('/:slug', RecipeValidator.updateRecipe(), validator, RecipeController.update)
router.get('/:slug', RecipeController.getOne)
router.delete('/:slug', RecipeController.delete)

module.exports = router
