const BaseController = require('./base.service')

const Recipe = require('../../models/Recipe')
const Category = require('../../models/Category')
const Review = require('../../models/Review')

class RecipeService extends BaseController {
    /**
     * @param user { User }
     */
    constructor(user) {
        super(user)
    }

    async count() {
        return Recipe.find(this.isModQuery()).countDocuments()
    }

    /**
     * @param filter { Object }
     * @param order
     * @param page
     * @param limit
     * @returns {Promise<Recipe>}
     */
    async getMany(filter, { order, page, limit }) {
        return Recipe.find(this.mergeQuery(filter))
            .populate([
                {
                    path: 'category',
                    model: Category
                }
            ])
            .sort({
                [order]: -1
            })
            .skip(page * limit)
            .limit(limit)
    }

    /**
     * @param filter { Object }
     * @param order
     * @param page
     * @param limit
     * @returns {Promise<Recipe>}
     */
    async search(filter, { page, limit }) {
        return Recipe.find(this.mergeQuery(filter))
            .populate([
                {
                    path: 'category',
                    model: Category
                }
            ])
            .skip(page * limit)
            .limit(limit)
    }

    /**
     * @param filter { Object }
     * @returns {Promise<Query<any, any, {}, any>>}
     */
    async getOne(filter) {
        return Recipe.findOne(this.mergeQuery(filter)).populate([
            {
                path: 'category',
                model: Category
            }
        ])
    }

    /**
     * @param filter { Object }
     * @requires filter
     * @param document { String }
     * @requires document
     * @param document.name { String }
     * @param document.avatar { String }
     * @param document.content { String }
     * @param document.category { ObjectID }
     * @param document.ingredients { [{ name: String, count: Number, unit: String }] }
     * @param document.stepper { [{ content: String, image: String }] }
     * @param document.time { Number }
     * @param document.preparation { Number }
     * @returns {Promise<Recipe>}
     */
    async update(
        filter,
        { name, avatar, content, category, ingredients, stepper, time, preparation }
    ) {
        return Recipe.findOneAndUpdate(
            this.mergeQuery(filter),
            { name, avatar, content, category, ingredients, stepper, time, preparation },
            { returnOriginal: false }
        )
    }

    async addRecipe({ name, avatar, content, category, ingredients, stepper, time, preparation }) {
        return Recipe.create({
            user: this.user._id,
            name,
            avatar,
            content,
            category,
            ingredients,
            stepper,
            time,
            preparation,
            createdAt: Date.now()
        })
    }

    /**
     * @param input { { Object } || [ Object ] }
     * @returns {{stepper: (function(): {image: String?, content: String}[]), ingredients: (function(): {unit: string, name: String, count: Number}[])}}
     */
    refactor(input) {
        return {
            ingredients: () => {
                const data = []
                Object.values(input).forEach(({ name, count, unit }) => {
                    name &&
                        parseInt(count) &&
                        unit &&
                        data.push({ name, count: parseInt(count), unit })
                })
                return data
            },
            stepper: () => {
                const data = []
                Object.values(input).forEach(({ content, image }) => {
                    content && data.push({ content, image })
                })
                return data
            }
        }
    }

    /**
     * @param filter { Object }
     * @returns {Promise<Query<any, any, {}, any>>}
     */
    async delete(filter) {
        return Recipe.findOneAndDelete(this.mergeQuery(filter))
    }
}
module.exports = RecipeService
