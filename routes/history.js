const express = require('express')
const router = express.Router()

const HistoryController = require('../controllers/history.controller')
const HistoryValidator = require('../validations/history.validation')
const AuthMiddleware = require('../middleware/auth.middleware')
const { validator } = require('../validations/validator')

/* GET users listing. */
router.get(
    '/',
    AuthMiddleware.auth,
    HistoryValidator.getMany(),
    validator,
    HistoryController.getMany
)

router.delete('/', AuthMiddleware.auth, HistoryController.deleteAll)

router.get('/count', AuthMiddleware.auth, HistoryController.count)

router.delete('/:_id', AuthMiddleware.auth, HistoryController.delete)

module.exports = router
