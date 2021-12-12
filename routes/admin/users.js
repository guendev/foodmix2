const express = require('express')
const router = express.Router()

const { count, search } = require('../../controllers/admin/user.controller')
const { searchQuery } = require('../../validations/admin/user.validation')

const { validator } = require('../../validations/validator')

router.get('/count', count)
router.get('/search', searchQuery(), validator, search)

module.exports = router
