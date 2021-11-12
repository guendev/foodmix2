const { check } = require('express-validator')

module.exports.getUsers = () => {
    return [
        check('page', 'Page không được để trống').isNumeric(),
        check('limit', 'Limit không được để trống').isNumeric()
    ]
}

module.exports.createUser = () => {
    return [
        check('name', 'Tên không được để trống').not().isEmpty(),
        check('email', 'Email không được để trống').not().isEmpty(),
        check('avatar', 'Avatar không được để trống').isURL(),
        check('password', 'Mật khẩu không được để trống').not().isEmpty(),
        check('password', 'Mật khẩu phải lớn hơn 6 ký tự').isLength({ min: 6 })
    ]
}

module.exports.update = () => {
    return [
        check('field').custom((value) => {
            if (!['name', 'email', 'avatar', 'password'].includes(value)) {
                throw new Error('Trường thay đổi không hợp lệ')
            }

            // Indicates the success of this synchronous custom validator
            return true
        }),
        check('value', 'Giá trị thay đổi là bắt buộc').not().isEmpty(),
        check('password').custom((value, { req }) => {
            if (req.body.field === 'password' && !value) {
                throw new Error('Bạn cần nhập mật khẩu hiện tại')
            }

            // Indicates the success of this synchronous custom validator
            return true
        })
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
