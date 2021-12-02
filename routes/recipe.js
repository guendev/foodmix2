const express = require('express')
const router = express.Router()

const RecipeController = require('../controllers/recipe.controller')
const RecipeValidator = require('../validations/recipe.validation')

const { validator } = require('../validations/validator')
const AuthMiddleware = require('../middleware/auth.middleware')

router.get('/', RecipeValidator.getRecipes(), validator, RecipeController.recipes)
router.get('/:slug', RecipeController.recipe)

router.post(
    '/:slug/review',
    AuthMiddleware.auth,
    RecipeValidator.postReview(),
    validator,
    RecipeController.addReview
)

router.get('/:slug/reviews', RecipeValidator.getReviews(), validator, RecipeController.reviews)

router.get('/:slug/bookmark', AuthMiddleware.auth, RecipeController.checkBookmark)

router.post('/:slug/bookmark', AuthMiddleware.auth, RecipeController.addBookmark)

router.delete('/:slug/bookmark', AuthMiddleware.auth, RecipeController.deleteBookmark)

module.exports = router
