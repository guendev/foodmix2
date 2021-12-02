const RecipeService = require('../../services/recipe.service')
const HistoryService = require('../../services/history.service')

/**
 * inc view khi xem recipe
 * @param recipe { { _id: ObjectID } }
 * @returns {Promise<void>}
 */
module.exports.viewRecipe = async (recipe) => {
    return RecipeService.update(recipe._id, { $inc: { views: 1 } })
}

/**
 * @param user { User }
 * @param recipe { Recipe }
 * @returns {Promise<void>}
 */
module.exports.addHistory = async (user, recipe) => {
    return HistoryService.add(user, recipe)
}
