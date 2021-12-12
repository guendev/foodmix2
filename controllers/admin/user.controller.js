const status = require('http-status')

const UserService = require('../../services/admin/user.service')

const Event = require('../../events')

module.exports.getMany = async ({ user, query }, res) => {
    const userService = new UserService(user)
    const { order, page, limit } = query
    const results = await userService.getMany({}, { order, page: parseInt(page), limit: parseInt(limit) })
    return res.json({ code: 1, data: results })
}

module.exports.count = async ({ user }, res) => {
    const userService = new UserService(user)
    const count = await userService.count()
    return res.json({ code: 1, data: count })
}

module.exports.deleteOne = async ({ user, params }, res) => {
    const userService = new UserService(user)
    const [admin, deleteUser] = await Promise.all([userService.getOne({ role: 'sp_admin' }), userService.getOne({ slug: params.slug })])
    if (!admin) {
        return res.status(status.FORBIDDEN).json({ code: 2, msg: 'Không có Super Admin' })
    }
    if (!deleteUser) {
        return res.status(status.FORBIDDEN).json({ code: 2, msg: 'User bị khoá không tồn tại' })
    }
    if (!userService.hasPermission(deleteUser.role)) {
        return res.status(status.FORBIDDEN).json({ code: 2, msg: 'Bạn không đủ quyền' })
    }
    await userService.deleteOne({ slug: params.slug })
    return res.json({ code: 2, msg: 'Xoá thành viên thành công' })
}

module.exports.updateOne = async ({ user, body, params }, res) => {
    const userService = new UserService(user)
    const modifierUser = await userService.getOne({ slug: params.slug })
    if (!modifierUser) {
        return res.status(status.FORBIDDEN).json({ code: 2, msg: 'User không tồn tại' })
    }

    // check xem được sủe user hay không
    if (!userService.hasPermission(modifierUser.role)) {
        return res.status(status.FORBIDDEN).json({ code: 2, msg: 'Bạn không đủ quyền' })
    }

    // check email
    if (modifierUser.email !== body.email) {
        const checkEmail = await userService.getOne({ email: body.email })
        if (!checkEmail) {
            return res.status(status.FORBIDDEN).json({ code: 2, msg: 'Email đã được sử dụng' })
        }
    }

    // check new role
    if (!userService.hasPermission(body.role)) {
        return res.status(status.FORBIDDEN).json({ code: 2, msg: `Bạn cần quyền cao hơn ${body.role}` })
    }

    const updatedUser = await userService.updateOne({ _id: modifierUser._id }, body)
    return res.json({ code: 2, data: updatedUser, msg: 'Cập nhật thành công' })
}

module.exports.search = async ({ user, query }, res) => {
    const userService = new UserService(user)
    const results = await userService.search(
        {
            [query.field]: {
                $regex: query.keyword,
                $options: 'i'
            }
        },
        { page: 0, limit: parseInt(query.limit) }
    )
    return res.json({ code: 1, data: results })
}
