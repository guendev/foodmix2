const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        index: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        unique: true
    },
    slug: {
        type: String,
        slug: 'name',
        unique: true,
        lowercase: true,
        index: true
    },
    role: {
        type: String,
        enum: ['user', 'mod', 'admin'],
        default: 'user'
    },
    avatar: {
        type: String,
        default: 'https://i.imgur.com/pqGLgGr.jpg'
    },
    password: {
        type: String,
        required: true,
        trim: true
    }
})

UserSchema.plugin(slug)

UserSchema.pre('save', function (next) {
    if (!this.isModified('password')) {
        return next()
    }
    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err)
        bcrypt.hash(this.password, salt, (err, hash) => {
            if (err) return next(err)
            this.password = hash
            next()
        })
    })
})

module.exports = mongoose.model('User', UserSchema)
