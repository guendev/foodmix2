const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema({
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
        default: 'https://i.imgur.com/mVqk1d3.jpg'
    },
    content: {
        type: String,
        default: ''
    }
})

const Category = mongoose.model('Category', CategorySchema)

module.exports = Category
