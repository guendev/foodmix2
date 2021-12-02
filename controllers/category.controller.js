const status = require('http-status')
const CategoryService = require('../services/category.service')
const RecipeService = require('../services/recipe.service')

module.exports.getOne = async ({ params }, res) => {
    const category = await CategoryService.getOne('slug', params.slug)
    if (!category) {
        return res.status(status.NOT_FOUND).json({ code: 1, msg: 'Category không tồn tại' })
    }
    return res.json({ code: 1, data: category, msg: 'Thành công' })
}

module.exports.getAll = async (req, res) => {
    const result = await CategoryService.getAll()
    return res.json({ code: 1, data: result, msg: 'Success' })
}

module.exports.countRecipe = async ({ params }, res) => {
    const category = await CategoryService.getOne('slug', params.slug)
    if (!category) {
        return res.status(status.NOT_FOUND).json({ code: 1, msg: 'Category không tồn tại' })
    }
    return res.json({
        code: 1,
        data: await RecipeService.countBy('category', category._id),
        msg: 'Thành công'
    })
}

module.exports.getRecipes = async ({ params, query }, res) => {
    const category = await CategoryService.getOne('slug', params.slug)
    if (!category) {
        return res.status(status.NOT_FOUND).json({ code: 1, msg: 'Category không tồn tại' })
    }
    const { order, page, limit } = query
    return res.json({
        code: 1,
        data: await RecipeService.getManyBy('category', category._id, order, page, limit),
        msg: 'Thành công'
    })
}
