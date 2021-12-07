const { check } = require('express-validator')

module.exports.getUsers = () => {
    return [
        check('page', 'Page không được để trống').isNumeric(),
        check('limit', 'Limit không được để trống').isNumeric()
    ]
}

module.exports.getProfileProperties = () => {
    return [
        check('page', 'Page không được để trống').isNumeric(),
        check('limit', 'Limit không được để trống').isNumeric(),
        check('order', 'Order không được để trống').not().isEmpty()
    ]
}

module.exports.createUser = () => {
    return [
        check('name', 'Tên không được để trống').not().isEmpty(),
        check('email', 'Email không được để trống').not().isEmpty(),
        check('email', 'Email không đúng').isEmail(),
        check('password', 'Mật khẩu không được để trống').not().isEmpty(),
        check('password', 'Mật khẩu phải lớn hơn 6 ký tự').isLength({ min: 6 })
    ]
}

module.exports.update = () => {
    return [
        check('email', 'Email không được để trống').not().isEmpty(),
        check('email', 'Email không hợp lêk').isEmail(),
        check('name', 'Tên là bắt buộc').not().isEmpty(),
        check('avatar', 'Ảnh đại diện là bắt buộc').not().isEmpty()
    ]
}

module.exports.updatePassword = () => {
    return [
        check('password', 'Mật khẩu không được để trống').not().isEmpty(),
        check('password', 'Mật khẩu phải lớn hơn 6 ký tự').isLength({ min: 6 }),
        check('oldPassword', 'Mật khẩu không được để trống').not().isEmpty(),
        check('oldPassword', 'Mật khẩu phải lớn hơn 6 ký tự').isLength({ min: 6 })
    ]
}

module.exports.signIn = () => {
    return [
        check('email', 'Email không được để trống').not().isEmpty(),
        check('email', 'Email không hợp lệ').isEmail(),

        check('password', 'Password không được để trống').not().isEmpty(),
        check('password', 'Password không hợp lệ')
    ]
}
