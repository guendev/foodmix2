const status = require('http-status')

const RecipeService = require('../../services/admin/recipe.service')
const CategoryService = require('../../services/category.service')

const Event = require('../../events')

module.exports.recipes = async ({ query, user }, res) => {
    const { page, limit, order } = query
    const recipeService = new RecipeService(user)
    const results = await recipeService.getMany(
        {},
        {
            order,
            page: parseInt(page),
            limit: parseInt(limit)
        }
    )
    return res.json({ code: 1, data: results })
}

module.exports.search = async ({ query, user }, res) => {
    const { limit, keyword } = query
    const recipeService = new RecipeService(user)
    const results = await recipeService.search(
        {
            name: {
                $regex: keyword,
                $options: 'i'
            }
        },
        { page: 0, limit: parseInt(limit) }
    )
    return res.json({ code: 1, data: results })
}

module.exports.getOne = async ({ params, user }, res) => {
    const recipeService = new RecipeService(user)
    const result = await recipeService.getOne({ slug: params.slug })
    if (!result) {
        return res.status(status.NOT_FOUND).json({ code: 1, msg: 'Công thức không tồn tại' })
    }
    return res.json({ code: 1, data: result })
}

module.exports.count = async ({ user }, res) => {
    const recipeService = new RecipeService(user)
    const result = await recipeService.count()
    return res.json({ code: 1, data: result })
}

module.exports.update = async ({ user, body, params }, res) => {
    const recipeService = new RecipeService(user)
    const category = await CategoryService.getOne('_id', body.category)
    if (!category) {
        return res.status(status.FORBIDDEN).json({ code: 2, msg: 'Phân loại không tồn tại' })
    }
    const ingredients = recipeService.refactor(body.ingredients).ingredients()
    if (!ingredients.length) {
        return res
            .status(status.FORBIDDEN)
            .json({ code: 2, msg: 'Nguyên liệu không được bỏ trống' })
    }
    const stepper = recipeService.refactor(body.stepper).stepper()
    if (!stepper.length) {
        return res.status(status.FORBIDDEN).json({ code: 2, msg: 'Các bước thực hiện là bắt buộc' })
    }
    // cập nhật recipe
    if (params.slug) {
        const result = await recipeService.update(
            { slug: params.slug },
            Object.assign({}, body, { ingredients, stepper })
        )
        if (!result) {
            return res.status(status.NOT_FOUND).json({ code: 1, data: [], msg: 'Recipe not found' })
        }
        return res.json({ code: 2, data: result, msg: 'Cập nhật thành công' })
    } else {
        const result = await recipeService.addRecipe(
            Object.assign({}, body, { ingredients, stepper })
        )
        return res.json({ code: 2, data: result, msg: 'Thêm mới thành công' })
    }
}

module.exports.delete = async ({ user, params }, res) => {
    const recipeService = new RecipeService(user)
    const result = await recipeService.delete({ slug: params.slug })
    if (!result) {
        return res.status(status.NOT_FOUND).json({ code: 1, data: [], msg: 'Recipe not found' })
    }
    // trigger sự kiện xoá review
    return res.json({ code: 2, msg: 'Xoá thành công' })
}
