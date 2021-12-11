const { check } = require('express-validator')

module.exports.updateCategory = () => {
    return [
        check('name', 'Tên không được để trống').not().isEmpty(),
        check('avatar', 'Avatar không được để trống').not().isEmpty(),
        check('content', 'Nội dung không được để trống').not().isEmpty()
    ]
}
