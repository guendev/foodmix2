const UserSerive = require('../services/user.service')

module.exports.users = async ({ body }, res) => {
    const { order, sort, page, limit } = body
    const result = await UserSerive.getMany(order, sort, page, limit)
    return res.json(result).send()
}
