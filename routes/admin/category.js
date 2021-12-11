const express = require('express')
const router = express.Router()

const CategoryController = require('../../controllers/admin/category.controller')
const CategoryValidator = require('../../validations/admin/category.validation')

const { validator } = require('../../validations/validator')

router.get('/', CategoryController.getAll)
router.post('/:slug', CategoryValidator.updateCategory(), validator, CategoryController.update)
router.delete('/:slug', CategoryController.delete)

module.exports = router
