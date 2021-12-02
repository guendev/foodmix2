const express = require('express')
const router = express.Router()

const BookmarkController = require('../controllers/bookmark.controller')
const BookmarkValidator = require('../validations/bookmark.validation')
const AuthMiddleware = require('../middleware/auth.middleware')
const { validator } = require('../validations/validator')

/* GET users listing. */
router.get(
    '/',
    AuthMiddleware.auth,
    BookmarkValidator.getMany(),
    validator,
    BookmarkController.getMany
)

router.delete('/', AuthMiddleware.auth, BookmarkController.deleteAll)

router.get('/count', AuthMiddleware.auth, BookmarkController.count)

router.delete('/:_id', AuthMiddleware.auth, BookmarkController.delete)

module.exports = router
