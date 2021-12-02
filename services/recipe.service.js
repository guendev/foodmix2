const Recipe = require('../models/Recipe')
const User = require('../models/User')
const Category = require('../models/Category')
const Review = require('../models/Review')

class RecipeService {
    /**
     * @param order { String }
     * @param sort { Number }
     * @param page { Number }
     * @param limit { Number }
     * @returns {Promise<[Recipe]>}
     */
    static async getMany(order, page, limit, sort = 1) {
        let _limit = this._getLimit(limit)
        return Recipe.find()
            .sort({
                [order]: sort
            })
            .skip(page * _limit)
            .populate([
                {
                    path: 'user',
                    model: User,
                    select: '-password'
                },
                {
                    path: 'category',
                    model: Category
                }
            ])
            .limit(_limit)
    }

    static async getManyBy(by, value, order, page, limit, sort = 1) {
        let _limit = this._getLimit(limit)
        return Recipe.find({ [by]: value })
            .sort({
                [order]: sort
            })
            .skip(page * _limit)
            .populate([
                {
                    path: 'user',
                    model: User,
                    select: '-password'
                },
                {
                    path: 'category',
                    model: Category
                }
            ])
            .limit(_limit)
    }

    /**
     * @param limit
     * @returns {*|number}
     * @private
     */
    static _getLimit(limit) {
        const _limit = parseInt(limit)
        return _limit <= 20 ? _limit : 20
    }

    /**
     * Lấy thông tin 1 công thức
     * @param field
     * @param value
     * @returns {Promise<?Recipe>}
     */
    static async getOne(field, value) {
        return Recipe.findOne({ [field]: value }).populate([
            {
                path: 'user',
                model: User,
                select: '-password'
            },
            {
                path: 'category',
                model: Category
            }
        ])
    }

    /**
     * @param field
     * @param value
     * @returns {Promise<Recipe>}
     */
    static async exist(field, value) {
        return Recipe.findOne({ [field]: value })
    }

    /**
     * @param _id
     * @param update { Object }
     * @returns {Promise<Query<any, any, {}, any>>}
     */
    static async update(_id, update) {
        return Recipe.findByIdAndUpdate(_id, update, { returnOriginal: false })
    }

    static async addReview(recipe, user, content, rating) {
        return Review.create({ user, recipe, content, rating, createdAt: Date.now() })
    }

    static async getReviews(recipe, order, page, limit) {
        const _limit = this._getLimit(limit)
        return Review.find({ recipe })
            .populate([
                {
                    path: 'user',
                    model: User,
                    select: '-password'
                }
            ])
            .sort({
                [order]: -1
            })
            .skip(page * _limit)
            .limit(_limit)
            .select('-recipe')
    }

    static async getReviewBy(by, value, order, page, limit) {
        const _limit = this._getLimit(limit)
        return Review.find({ [by]: value })
            .populate([
                {
                    path: 'user',
                    model: User,
                    select: '-password'
                },
                {
                    path: 'recipe',
                    model: Recipe
                }
            ])
            .sort({
                [order]: -1
            })
            .skip(page * _limit)
            .limit(_limit)
    }

    static async search(keyword, category, page, limit) {
        let _limit = this._getLimit(limit)
        return Recipe.find({
            name: {
                $regex: keyword,
                $options: 'i'
            },
            category: category || { $exists: true }
        })
            .populate([
                {
                    path: 'user',
                    model: User,
                    select: '-password'
                },
                {
                    path: 'category',
                    model: Category
                }
            ])
            .skip(page * _limit)
            .limit(_limit)
    }

    static async random(size, exclude = '', field = '_id') {
        return Recipe.aggregate([
            {
                $match: {
                    [field]: {
                        $ne: exclude
                    }
                }
            },
            { $sample: { size: size } },
            {
                $lookup: {
                    from: 'users',
                    localField: 'user',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            { $unwind: '$user' }
        ])
    }

    static async countBy(by, value) {
        return Recipe.find({ [by]: value }).countDocuments()
    }
}

module.exports = RecipeService
