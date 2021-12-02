const History = require('../models/History')
const BaseService = require('../services/base.service')
const Recipe = require('../models/Recipe')
const User = require('../models/User')
const Category = require('../models/Category')

class HistoryService extends BaseService {
    constructor() {
        super()
    }

    /**
     * @param user { User }
     * @param recipe { Recipe }
     * @returns {Promise<RecipeHistory>}
     */
    static async add(user, recipe) {
        return History.findOneAndUpdate(
            { user: user._id, recipe: recipe._id },
            { createdAt: Date.now() },
            { upsert: true }
        )
    }

    static async getMany(user, order, skip, limit) {
        return History.find({ user: user._id })
            .populate([
                {
                    path: 'recipe',
                    model: Recipe,
                    populate: [
                        {
                            path: 'user',
                            model: User,
                            select: '-password'
                        },
                        {
                            path: 'category',
                            model: Category
                        }
                    ]
                }
            ])
            .skip(skip)
            .limit(limit)
    }

    static async delete(user, _id) {
        return History.findOneAndDelete({ user: user._id, _id })
    }

    static async deleteAll(user) {
        return History.deleteMany({ user: user._id })
    }

    /**
     * @param user
     * @returns {Promise<Query<number, any, {}, any>>}
     */
    static async count(user) {
        return History.find({ user: user._id }).countDocuments()
    }
}
module.exports = HistoryService
