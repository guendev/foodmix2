const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')

/**
 * Model công thức món ăn
 * @class Recipe
 **/
const RecipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        slug: 'name',
        unique: true,
        lowercase: true,
        index: true
    },
    avatar: {
        type: String,
        default: 'https://i.imgur.com/pqGLgGr.jpg'
    },
    content: {
        type: String,
        default: ''
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        index: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        index: true
    },
    ingredients: {
        type: [
            {
                name: String,
                count: Number,
                unit: String,
                _id: false
            }
        ],
        default: []
    },
    stepper: {
        type: [
            {
                content: String,
                image: {
                    type: String,
                    _id: false
                },
                _id: false
            }
        ]
    },
    time: {
        type: String,
        index: true,
        required: true
    },
    preparation: {
        type: String,
        index: true,
        required: true
    },
    rating: {
        type: Number,
        default: 0,
        index: true
    },
    views: {
        type: Number,
        default: 0,
        index: true
    },
    countRating: {
        type: Number,
        default: 0,
        index: true
    },
    createdAt: {
        type: Number,
        default: Date.now(),
        index: true
    }
})

RecipeSchema.plugin(slug)

const Recipe = mongoose.model('Recipe', RecipeSchema)

module.exports = Recipe
