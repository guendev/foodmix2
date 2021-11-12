const status = require('http-status')

const UserSerive = require('../services/user.service')
const AuthController = require('./auth.controller')

module.exports.users = async ({ body }, res) => {
    const { order, sort, page, limit } = body
    const result = await UserSerive.getMany(order, sort, page, limit)
    return res.json(result).send()
}

module.exports.create = async ({ body }, res) => {
    const { name, email, password, avatar } = body

    // Kiểm tra email đã đăng ký hay chưa
    const check = await UserSerive.getOne('email', email)
    if (check) {
        return res.status(status.FORBIDDEN).send('Email đã tồn tại')
    }
    const user = await UserSerive.create(name, email, avatar, password, 'user')
    const token = AuthController.createToken(user)
    return res.json({ token }).send()
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
    const { field, value, password } = body

    if (field === 'email') {
        const check = await UserSerive.getOne('email', value)
        if (check && check.email !== user.email) {
            return res.status(status.FORBIDDEN).send('Email đã tồn tại')
        }
    }

    if (field === 'password') {
        const check = await UserSerive.checkPassword(password, user.password)
        if (!check) {
            return res.status(status.FORBIDDEN).send('Mật khẩu hiện tại không đúng')
        }
    }

    const data = await UserSerive.update(user._id, field, value)

    return res.json(data).send()
}

module.exports.signIn = async ({ body }, res) => {
    const { email, password } = body
    const user = await UserSerive.getOne('email', email)
    if (!user) {
        return res.status(status.FORBIDDEN).send('Tài khoản không tồn tại')
    }
    const checkPass = await UserSerive.checkPassword(password, user.password)
    if (!checkPass) {
        return res.status(status.FORBIDDEN).send('Mật khẩu không đúng')
    }

    const token = AuthController.createToken(user)
    return res.json({ token }).send()
}

module.exports.getMe = ({ user }, res) => {
    if (!user) {
        return res.status(status.FORBIDDEN).send('Bạn cần đăng nhập trước')
    }
    return res.json(user).send()
}
