const BaseController = require('./base.service')

const User = require('../../models/User')

class RecipeService extends BaseController {
    /**
     * @param user { User }
     */
    constructor(user) {
        super(user)
        this._roles = ['user', 'mod', 'admin', 'sp_admin']
    }

    async count() {
        return User.countDocuments()
    }

    async getMany(filter, { order, page, limit }) {
        return User.find(filter)
            .sort({
                [order]: -1
            })
            .skip(page * limit)
            .limit(limit)
            .select('-password')
    }

    async search(filter, { page, limit }) {
        return User.find(filter)
            .skip(page * limit)
            .limit(limit)
            .select('-password')
    }

    async getOne(filter) {
        return User.findOne(filter).select('-password')
    }

    async deleteOne(filter) {
        return User.findOneAndDelete(filter)
    }

    hasPermission(role) {
        const index1 = this._roles.indexOf(this.user.role)
        const index2 = this._roles.indexOf(role)
        return index1 > index2
    }

    /**
     * @param filter { Object }
     * @param name { String }
     * @param email { String }
     * @param role { String }
     * @param avatar { String }
     * @param banner { String }
     * @param province { String }
     * @param about { String }
     * @returns {Promise<Query<User, any, {}, any>>}
     */
    async updateOne(filter, { name, email, role, avatar, banner, province, about }) {
        return User.findOneAndUpdate(filter, { name, email, role, avatar, banner, province, about }, { returnOriginal: false }).select('-password')
    }
}
module.exports = RecipeService
