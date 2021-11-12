const User = require('../models/User')
const jwt = require('jsonwebtoken')

class AuthController {
    constructor() {}

    static createToken({ _id, email }) {
        return jwt.sign({ _id, email }, process.env.SECRET, {
            expiresIn: '7d'
        })
    }

    static readToken(_token) {
        try {
            return jwt.verify(_token, process.env.SECRET)
        } catch (e) {
            return null
        }
    }

    static async getUser(_token) {
        const check = this.readToken(_token)
        if (check) {
            const user = await User.findById(check._id)
            if (!user) {
                return null
            }
            return user
        } else {
            return null
        }
    }
}

module.exports = AuthController
