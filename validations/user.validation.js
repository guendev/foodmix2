const { check } = require('express-validator')

module.exports.getUsersValidator = () => {
    return [
        check('page', 'Page không được để trống').isNumeric(),
        check('limit', 'Limit không được để trống').isNumeric()
    ]
}
