const express = require('express')
const router = express.Router()
const upload = require('../config/multer')
const UploadController = require('../controllers/upload.controller')
const AuthMiddleware = require('../middleware/auth.middleware')

router.post('/single', AuthMiddleware.auth, upload.single('image'), UploadController.single)

module.exports = router
