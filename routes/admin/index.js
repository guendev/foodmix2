const express = require('express')
const router = express.Router()

const AuthMiddleware = require('../../middleware/auth.middleware')

const routers = [
    {
        prefix: '/recipe',
        router: require('./recipe')
    },
    {
        prefix: '/recipes',
        router: require('./recipes')
    }
]

routers.forEach((e) => {
    router.use(e.prefix, AuthMiddleware.auth, e.router)
})

module.exports = router
