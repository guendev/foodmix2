const status = require('http-status')

const BookmarkService = require('../services/bookmark.service')

module.exports.count = async ({ user }, res) => {
    return res.json({ code: 1, data: await BookmarkService.count(user), msg: 'Thành công' })
}

module.exports.getMany = async ({ user, query }, res) => {
    const { limit, skip } = query
    const result = await BookmarkService.getMany(
        user,
        'createdAt',
        parseInt(skip),
        BookmarkService.getLimit(limit)
    )
    return res.json({ code: 1, data: result, msg: '' })
}

module.exports.delete = async ({ user, params }, res) => {
    await BookmarkService.delete(user, params._id)

    return res.json({ code: 2, msg: 'Xoá thành công' })
}

module.exports.deleteAll = async ({ user }, res) => {
    await BookmarkService.deleteALl(user)
    return res.json({ code: 2, msg: 'Xoá thành công' })
}
