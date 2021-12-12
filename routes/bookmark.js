const express = require('express')
const router = express.Router()

const BookmarkController = require('../controllers/bookmark.controller')
const BookmarkValidator = require('../validations/bookmark.validation')
const { authRequired } = require('../middleware/auth.middleware')
const { validator } = require('../validations/validator')

/* GET users listing. */
router.get('/', authRequired, BookmarkValidator.getMany(), validator, BookmarkController.getMany)

router.delete('/', authRequired, BookmarkController.deleteAll)

router.get('/count', authRequired, BookmarkController.count)

router.delete('/:_id', authRequired, BookmarkController.delete)

module.exports = router
