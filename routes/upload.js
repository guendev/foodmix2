const express = require('express')
const router = express.Router()
const upload = require('../config/multer')
const UploadController = require('../controllers/upload.controller')
const { authRequired } = require('../middleware/auth.middleware')

router.post('/single', authRequired, upload.single('image'), UploadController.single)

module.exports = router
