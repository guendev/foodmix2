const Bookmark = require('../models/Bookmark')
const Recipe = require('../models/Recipe')
const User = require('../models/User')
const BaseService = require('./base.service')

class HistoryService extends BaseService {
    /**
     * @param user { User }
     * @param recipe { Recipe }
     * @returns {Promise<RecipeHistory>}
     */
    static async add(user, recipe) {
        return Bookmark.findOneAndUpdate(
            {
                user: user._id,
                recipe: recipe._id
            },
            { createdAt: Date.now() },
            { returnOriginal: false, upsert: true }
        )
    }

    static async delete(user, _id) {
        return Bookmark.findOneAndDelete({ user: user._id, _id })
    }

    static async deleteALl({ _id }) {
        return Bookmark.deleteMany({ user: _id })
    }

    static async exist(user, recipe) {
        return Bookmark.findOne({ user: user._id, recipe: recipe._id })
    }

    static async count(user) {
        return Bookmark.find({ user: user._id }).countDocuments()
    }

    static async getMany(user, order, skip, limit) {
        return Bookmark.find({ user: user._id })
            .populate([
                {
                    path: 'recipe',
                    model: Recipe,
                    populate: {
                        path: 'user',
                        model: User,
                        select: '-password'
                    }
                }
            ])
            .skip(skip)
            .limit(limit)
    }
}
module.exports = HistoryService
