const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')

const CategorySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        index: true
    },
    recipe: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        index: true
    },
    content: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 0,
        max: 5
    },
    createdAt: {
        type: Number,
        index: true
    }
})

CategorySchema.plugin(slug)

const Category = mongoose.model('Review', CategorySchema)

module.exports = Category
