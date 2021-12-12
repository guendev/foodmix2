const status = require('http-status')

const UserSerive = require('../services/user.service')
const RecipeService = require('../services/recipe.service')
const AuthController = require('./auth.controller')

module.exports.users = async ({ body }, res) => {
    const { order, sort, page, limit } = body
    const result = await UserSerive.getMany(order, sort, page, limit)
    return res.json(result).send()
}

module.exports.user = async ({ params }, res) => {
    const user = await UserSerive.getOne('slug', params.slug)
    if (!user) {
        return res.status(status.NOT_FOUND).json({ code: 1, data: '', msg: 'Đầu bếp không tồn tại' })
    }
    return res.json({ code: 1, data: user, msg: '' })
}

module.exports.userToRecipes = async ({ params, query }, res) => {
    const user = await UserSerive.getOne('slug', params.slug)
    if (!user) {
        return res.status(status.NOT_FOUND).json({ code: 1, data: '', msg: 'Đầu bếp không tồn tại' })
    }
    const { page, limit, order } = query
    const recipes = await RecipeService.getManyBy('user', user._id, order, parseInt(page), parseInt(limit))
    return res.json({ code: 1, data: recipes, msg: '' })
}

module.exports.userToReviews = async ({ params, query }, res) => {
    const user = await UserSerive.getOne('slug', params.slug)
    if (!user) {
        return res.status(status.NOT_FOUND).json({ code: 1, data: '', msg: 'Đầu bếp không tồn tại' })
    }
    const { page, limit, order } = query
    const recipes = await RecipeService.getReviewBy('user', user._id, order, parseInt(page), parseInt(limit))
    return res.json({ code: 1, data: recipes, msg: '' })
}

module.exports.create = async ({ body }, res) => {
    const { name, email, password } = body

    // Kiểm tra email đã đăng ký hay chưa
    const check = await UserSerive.getOne('email', email)
    if (check) {
        return res.status(status.FORBIDDEN).send({ code: 2, msg: 'Email đã tồn tại' })
    }
    const user = await UserSerive.create(name, email, password, 'user')
    const token = AuthController.createToken(user)
    return res.json({ code: 2, data: token, msg: 'Đăng Ký Thành Công' })
}

module.exports.count = async (req, res) => {
    console.log(req.user)
    const count = await UserSerive.count()
    return res.json({ count }).send()
}

/**
 * Đây là user của user chứ không phải admin
 * @param body
 * @param user
 * @param res
 * @returns {Promise<void>}
 */
module.exports.update = async ({ body, user }, res) => {
    const { name, email, avatar, banner, about, province } = body

    const check = await UserSerive.getOne('email', email)
    if (check && check.email !== user.email) {
        return res.status(status.FORBIDDEN).json({ code: 2, msg: 'Email đã tồn tại' })
    }
    await UserSerive.update(user._id, name, email, avatar, banner, about || '', province || '')
    return res.json({ code: 2, msg: 'Cập nhật thông tin thành công' })
}

module.exports.updatePassword = async ({ body, user }, res) => {
    const { password, oldPassword } = body
    const check = await UserSerive.checkPassword(oldPassword, user.password)
    if (!check) {
        return res.status(status.FORBIDDEN).json({ code: 2, msg: 'Mật khẩu hiện tại không đúng' })
    }
    await UserSerive.updatePassword(user._id, password)
    return res.json({ code: 2, msg: 'Đổi mật khẩu thành công' })
}

module.exports.signIn = async ({ body }, res) => {
    const { email, password } = body
    const user = await UserSerive.getOne('email', email, '')
    if (!user) {
        return res.status(status.FORBIDDEN).json({ code: 2, msg: 'Tài khoản không tồn tại' })
    }
    const checkPass = await UserSerive.checkPassword(password, user.password)
    if (!checkPass) {
        return res.status(status.FORBIDDEN).json({ code: 2, msg: 'Mật khẩu không đúng' })
    }

    const token = AuthController.createToken(user)
    return res.json({ code: 2, data: token, msg: 'Đăng Nhập Thành Công' })
}

module.exports.getMe = ({ user }, res) => {
    if (!user) {
        return res.status(status.FORBIDDEN).json({ code: 1, msg: 'Bạn cần đăng nhập trước' })
    }
    return res.json({ code: 1, data: user, msg: '' })
}
