const express = require('express')
const router = express.Router()

const { permission } = require('../../middleware/auth.middleware')

const routers = [
    {
        prefix: '/recipe',
        router: require('./recipe'),
        permission: ['user', 'mod', 'admin']
    },
    {
        prefix: '/recipes',
        router: require('./recipes'),
        permission: ['user', 'mod', 'admin']
    },
    {
        prefix: '/category',
        router: require('./category'),
        permission: ['mod', 'admin']
    },
    {
        prefix: '/user',
        router: require('./user'),
        permission: ['mod', 'admin']
    },
    {
        prefix: '/users',
        router: require('./users'),
        permission: ['mod', 'admin']
    }
]

routers.forEach((e) => {
    router.use(e.prefix, permission(e.permission), e.router)
})

module.exports = router
