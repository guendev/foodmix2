const { validationResult } = require('express-validator')
const status = require('http-status')

module.exports.validator = (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(status.FORBIDDEN).json(errors)
    }

    next()
}
