const express = require('express')
const router = express.Router()

const homeRouter = require('./home')
const userRouter = require('./users')
const categoryRouter = require('./category')
const recipeRouter = require('./recipe')
const searchRouter = require('./search')
const bookmarkController = require('./bookmark')
const historyController = require('./history')
const uploadRouter = require('./upload')

const profileController = require('./profile')

const routers = [
    {
        prefix: '/',
        router: homeRouter
    },
    {
        prefix: '/users',
        router: userRouter
    },
    {
        prefix: '/categories',
        router: categoryRouter
    },
    {
        prefix: '/recipes',
        router: recipeRouter
    },
    {
        prefix: '/search',
        router: searchRouter
    },
    {
        prefix: '/bookmark',
        router: bookmarkController
    },
    {
        prefix: '/history',
        router: historyController
    },
    {
        prefix: '/upload',
        router: uploadRouter
    },
    {
        prefix: '/profile',
        router: profileController
    }
]

routers.forEach((e) => {
    router.use(e.prefix, e.router)
})

module.exports = router
