const User = require('../models/User')
const bcrypt = require('bcrypt')

class UserService {
    constructor() {}

    /**
     * @param field
     * @param value
     * @param exclude
     * @returns {Promise<User>}
     */
    static async getOne(field, value, exclude = '-password') {
        return User.findOne({ [field]: value }).select(exclude)
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
     * @param password
     * @param role
     * @returns {Promise<EnforceDocument<any, {}, {}>>}
     */
    static async create(name, email, password, role) {
        return User.create({
            name,
            email,
            password,
            role,
            createdAt: Date.now()
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
     * @param password
     * @returns {Promise<Query<any, any, {}, any>>}
     */
    static async updatePassword(_id, password) {
        const hash = await this.hashPassword(password)

        return User.findByIdAndUpdate(_id, { password: hash }, { returnOriginal: false })
    }

    static async checkPassword(password, hash) {
        try {
            return bcrypt.compareSync(password, hash)
        } catch (e) {
            return false
        }
    }

    static async update(_id, name, email, avatar, banner, about, province) {
        return User.findByIdAndUpdate(_id, { email, name, avatar, banner, about, province })
    }

    static async hashPassword(password) {
        return bcrypt.hashSync(password, 10)
    }
}

module.exports = UserService
