const User = require('../models/User')
const bcrypt = require('bcrypt')

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
    static async create(name, email, avatar, password, role) {
        return User.create({
            name,
            email,
            avatar,
            password,
            role
        })
    }

    /**
     * @returns {Promise<Query<number, any, {}, any>>}
     */
    static async count() {
        return User.countDocuments()
    }

    /**
     * @param _id
     * @param field
     * @param value
     * @returns {Promise<Query<any, any, {}, any>>}
     */
    static async update(_id, field, value) {
        let data = value
        if (field === 'password') {
            data = await this.hashPassword(value)
        }

        return User.findByIdAndUpdate(_id, { [field]: data }, { returnOriginal: false })
    }

    static async checkPassword(password, hash) {
        try {
            return bcrypt.compareSync(password, hash)
        } catch (e) {
            return false
        }
    }

    static async hashPassword(password) {
        return bcrypt.hashSync(password, 10)
    }
}

module.exports = UserService
