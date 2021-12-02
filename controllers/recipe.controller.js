const status = require('http-status')

const RecipeService = require('../services/recipe.service')
const CategoryService = require('../services/category.service')
const BookmarkService = require('../services/bookmark.service')

const Event = require('../events')

module.exports.recipes = async ({ query }, res) => {
    const { page, limit, order } = query
    const result = await RecipeService.getMany(order, parseInt(page), parseInt(limit))
    return res.json({ code: 1, data: result, msg: 'Thành Công' })
}

module.exports.recipe = async ({ params, user, ip }, res) => {
    console.log(ip)
    const recipe = await RecipeService.getOne('slug', params.slug)
    if (!recipe) {
        return res.status(status.NOT_FOUND).json({ code: 1, data: [], msg: 'Recipe not found' })
    }
    // sự kiện view recipe
    Event.viewRecipe(recipe)
    if (user) {
        Event.addRecipeHistory(user, recipe)
    }
    return res.json({ code: 1, data: recipe, msg: 'Thành Công' })
}

module.exports.addReview = async ({ body, params, user }, res) => {
    const recipe = await RecipeService.exist('slug', params.slug)
    if (!recipe) {
        return res.status(status.NOT_FOUND).json({ code: 1, data: [], msg: 'Recipe not found' })
    }
    const { content, rating } = body
    const newRating = (recipe.rating * recipe.countRating + rating) / (recipe.countRating + 1)
    let [review, newRecipe] = await Promise.all([
        RecipeService.addReview(recipe._id, user._id, content, rating),
        RecipeService.update(recipe._id, {
            $inc: {
                countRating: 1
            },
            rating: parseInt(newRating.toFixed(1))
        })
    ])
    review = Object.assign({}, review.toObject())
    delete review.recipe
    delete review.user
    return res.json({
        code: 2,
        data: {
            review,
            recipe: {
                _id: newRecipe._id,
                rating: newRecipe.rating,
                countRating: newRecipe.countRating
            }
        },
        msg: 'Đánh giá thành công'
    })
}

module.exports.reviews = async ({ query, params }, res) => {
    const recipe = await RecipeService.exist('slug', params.slug)
    if (!recipe) {
        return res.status(status.NOT_FOUND).json({ code: 1, data: [], msg: 'Recipe not found' })
    }

    const { order, page, limit } = query

    return res.json({
        code: 1,
        data: await RecipeService.getReviews(recipe._id, order, page, limit),
        msg: 'Thành công'
    })
}

module.exports.search = async ({ query }, res) => {
    const { keyword, category, page, limit } = query
    let result = []
    if (category) {
        let checkCategory = await CategoryService.getOne('slug', category)
        if (!checkCategory) {
            return res.status(status.NOT_FOUND).json({ code: 1, msg: 'Category không tồn tại' })
        }

        result = await RecipeService.search(keyword, checkCategory._id, page, limit)
    } else {
        result = await RecipeService.search(keyword, false, page, limit)
    }
    return res.json({ code: 1, data: result, msg: 'Thành công' })
}

module.exports.random = async ({ query }, res) => {
    const { size, exclude } = query
    return res.json({
        code: 1,
        data: await RecipeService.random(parseInt(size) || 6, exclude),
        msg: 'Thành công'
    })
}

module.exports.addBookmark = async ({ query, params, user }, res) => {
    const recipe = await RecipeService.exist('slug', params.slug)
    if (!recipe) {
        return res.status(status.NOT_FOUND).json({ code: 1, data: [], msg: 'Recipe not found' })
    }
    await BookmarkService.add(user, recipe)
    return res.json({ code: 2, data: {}, msg: 'Bookmark thành công' })
}

module.exports.deleteBookmark = async ({ query, params, user }, res) => {
    const recipe = await RecipeService.exist('slug', params.slug)
    if (!recipe) {
        return res.status(status.NOT_FOUND).json({ code: 1, data: [], msg: 'Recipe not found' })
    }
    await BookmarkService.delete(user, recipe)
    return res.json({ code: 2, data: {}, msg: 'Xoá thành công thành công' })
}

module.exports.checkBookmark = async ({ query, params, user }, res) => {
    const recipe = await RecipeService.exist('slug', params.slug)
    if (!recipe) {
        return res.status(status.NOT_FOUND).json({ code: 1, data: [], msg: 'Recipe not found' })
    }
    const check = await BookmarkService.exist(user, recipe)
    return res.json({ code: 1, data: !!check, msg: 'Thành công' })
}
