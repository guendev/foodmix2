const { check } = require('express-validator')

module.exports.getManyQuery = () => {
    return [
        check('order', 'Order không được để trống').not().isEmpty(),
        check('page', 'Page không được để trống').isNumeric(),
        check('limit', 'Limit không được để trống').isNumeric()
    ]
}

module.exports.searchQuery = () => {
    return [
        check('keyword', 'Keyword không được để trống').not().isEmpty(),
        check('field', 'Field không được để trống').not().isEmpty(),
        check('limit', 'Limit không được để trống').isNumeric()
    ]
}

module.exports.updateOneBody = () => {
    return [
        check('name', 'Tên không được để trống').not().isEmpty(),
        check('email', 'Email không được để trống').not().isEmpty(),
        check('email', 'Email không hợp lệ').isEmail(),
        check('avatar', 'Avatar không được để trống').not().isEmpty(),
        check('banner', 'Banner không được để trống').not().isEmpty(),
        check('role', 'Role không được để trống').not().isEmpty(),
        check('province', 'Province không được để trống').not().isEmpty()
    ]
}
