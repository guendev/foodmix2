const Category = require('../models/Category')

class CategoryService {
    constructor() {}

    static async getOne(field, value) {
        return Category.findOne({ [field]: value })
    }

    static async getAll() {
        return Category.find()
    }

    static async create(name, avatar, content) {
        return Category.create({ name, avatar, content })
    }

    static async update(_id, name, avatar, content) {
        return Category.findByIdAndUpdate(_id, { name, avatar, content }, { returnOriginal: false })
    }

    static async delete(_id) {
        return Category.findByIdAndDelete(_id)
    }
}
module.exports = CategoryService
