const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        index: true
    },
    slug: {
        type: String,
        slug: 'name',
        lowercase: true,
        index: true
    },
    role: {
        type: String,
        enum: ['user', 'mod', 'admin'],
        default: 'user'
    },
    avatar: {
        type: String
    }
})

UserSchema.plugin(slug)

module.exports = mongoose.model('User', UserSchema)
