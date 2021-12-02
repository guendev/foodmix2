const { check } = require('express-validator')

module.exports.getMany = () => {
    return [
        check('skip', 'Skip không được để trống').isNumeric(),
        check('limit', 'Limit không được để trống').isNumeric()
    ]
}
