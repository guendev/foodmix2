const express = require('express')
const router = express.Router()

const HistoryController = require('../controllers/history.controller')
const HistoryValidator = require('../validations/history.validation')
const { authRequired } = require('../middleware/auth.middleware')
const { validator } = require('../validations/validator')

/* GET users listing. */
router.get('/', authRequired, HistoryValidator.getMany(), validator, HistoryController.getMany)

router.delete('/', authRequired, HistoryController.deleteAll)

router.get('/count', authRequired, HistoryController.count)

router.delete('/:_id', authRequired, HistoryController.delete)

module.exports = router
