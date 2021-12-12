const express = require('express')
const router = express.Router()

const RecipeController = require('../controllers/recipe.controller')
const RecipeValidator = require('../validations/recipe.validation')

const { validator } = require('../validations/validator')
const { authRequired } = require('../middleware/auth.middleware')

router.get('/', RecipeValidator.getRecipes(), validator, RecipeController.recipes)
router.get('/:slug', RecipeController.recipe)

router.post('/:slug/review', authRequired, RecipeValidator.postReview(), validator, RecipeController.addReview)

router.get('/:slug/reviews', RecipeValidator.getReviews(), validator, RecipeController.reviews)

router.get('/:slug/bookmark', authRequired, RecipeController.checkBookmark)

router.post('/:slug/bookmark', authRequired, RecipeController.addBookmark)

router.delete('/:slug/bookmark', authRequired, RecipeController.deleteBookmark)

module.exports = router
