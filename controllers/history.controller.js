const HistoryService = require('../services/history.service')

module.exports.count = async ({ user }, res) => {
    return res.json({ code: 1, data: await HistoryService.count(user), msg: 'Thành công' })
}

module.exports.getMany = async ({ user, query }, res) => {
    const { limit, skip } = query
    const result = await HistoryService.getMany(
        user,
        'createdAt',
        parseInt(skip),
        HistoryService.getLimit(limit)
    )
    return res.json({ code: 1, data: result, msg: '' })
}

module.exports.delete = async ({ user, params }, res) => {
    await HistoryService.delete(user, params._id)

    return res.json({ code: 2, msg: 'Xoá thành công' })
}

module.exports.deleteAll = async ({ user }, res) => {
    await HistoryService.deleteAll(user)
    return res.json({ code: 2, msg: 'Xoá thành công' })
}
