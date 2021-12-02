const mongoose = require('mongoose')

/**
 * Model Món ăn sưu tập
 * @class Bookmark
 */

const BookmarkSchema = new mongoose.Schema({
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
    createdAt: {
        type: Number,
        index: true
    }
})

module.exports = mongoose.model('Bookmark', BookmarkSchema)
