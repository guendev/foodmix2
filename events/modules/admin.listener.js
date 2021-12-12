const Review = require('../../models/Review')
const Recipe = require('../../models/Recipe')

module.exports.deleteReviews = async ({ _id }) => {
    return Review.deleteMany({ recipe: _id })
}

module.exports.deleteCategory = async (oldCategory, newCategory) => {
    return Recipe.updateMany({ category: oldCategory._id }, { category: newCategory._id })
}
