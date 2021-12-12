const BaseController = require('./base.service')

const Category = require('../../models/Category')

class RecipeService extends BaseController {
    /**
     * @param user { User }
     */
    constructor(user) {
        if (!['admin', 'mod'].includes(user.role)) {
            throw new Error('Không có quyền truy cập')
        }
        super(user)
    }

    async getAll() {
        return Category.find()
    }

    /**
     * @param filter { Object }
     * @param name { String }
     * @param avatar { String }
     * @param content { String }
     * @returns {Promise<void>}
     */
    async update(filter, { name, avatar, content }) {
        return Category.findOneAndUpdate(
            filter,
            { name, avatar, content },
            { returnOriginal: false }
        )
    }

    async delete(filter) {
        return Category.findOneAndDelete(filter)
    }

    async getOne(filter) {
        return Category.findOne(filter)
    }
}
module.exports = RecipeService
