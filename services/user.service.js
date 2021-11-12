const User = require('../models/User')

class UserService {
    constructor() {}

    /**
     * @param field { String }
     * @param value { String }
     */
    static async getOne(field, value) {
        return User.findOne({ [field]: value })
    }

    /**
     * @param order { String }
     * @param sort { Number }
     * @param page { Number }
     * @param limit { Number }
     * @returns {Promise<void>}
     */
    static async getMany(order, sort = 1, page, limit) {
        return User.find()
            .sort({
                [order]: sort
            })
            .skip(page * limit)
            .limit(limit)
    }

    /**
     * Tạo user mới
     * @param name
     * @param email
     * @param avatar
     * @param password
     * @param role
     * @returns {Promise<EnforceDocument<any, {}, {}>>}
     */
    static async create({ name, email, avatar, password, role }) {
        return User.create({
            name,
            email,
            avatar,
            password,
            role
        })
    }

    /**
     * @returns Number
     */
    static async count() {
        return User.countDocuments()
    }
}

module.exports = UserService
