const express = require('express')
const router = express.Router()

const RecipeController = require('../../controllers/admin/recipe.controller')

const { validator } = require('../../validations/validator')

router.get('/count', RecipeController.count)
router.get('/search', RecipeController.search)

module.exports = router
