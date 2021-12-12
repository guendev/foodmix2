const express = require('express')
const router = express.Router()

const { getMany, deleteOne, updateOne } = require('../../controllers/admin/user.controller')
const { getManyQuery, updateOneBody } = require('../../validations/admin/user.validation')

const { validator } = require('../../validations/validator')

router.get('/', getManyQuery(), validator, getMany)
router.delete('/:slug', deleteOne)
router.patch('/:slug', updateOneBody(), validator, updateOne)

module.exports = router
