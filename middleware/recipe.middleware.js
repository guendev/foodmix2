const status = require('http-status')
const RecipeService = require('../services/recipe.service')

module.exports = async (req, res, next) => {
    const recipe = await RecipeService.exist('slug', req.params.slug)
    if (!recipe) {
        return res.status(status.NOT_FOUND).json({ code: 1, data: [], msg: 'Recipe not found' })
    }
    req.recipe = recipe
    next()
}
