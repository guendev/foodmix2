const events = require('events')
const eventEmitter = new events.EventEmitter()

const RecipeListener = require('./modules/recipe.listener')
const UploadListener = require('./modules/upload.listener')

/**
 * @param recipe { Recipe }
 */
function viewRecipe(recipe) {
    eventEmitter.once('VIEW_RECIPE', RecipeListener.viewRecipe)
    eventEmitter.emit('VIEW_RECIPE', recipe)
}

function addRecipeHistory(user, recipe) {
    eventEmitter.once('HISTORY_RECIPE', RecipeListener.addHistory)
    eventEmitter.emit('HISTORY_RECIPE', user, recipe)
}

function removeFile(path) {
    eventEmitter.once('REMOVE_FILE', UploadListener.removeFile)
    eventEmitter.emit('REMOVE_FILE', path)
}

module.exports = {
    viewRecipe,
    addRecipeHistory,
    removeFile
}
