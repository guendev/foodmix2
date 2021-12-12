const status = require('http-status')

module.exports.authRequired = ({ user }, res, next) => {
    if (!user) {
        return res.status(status.UNAUTHORIZED).send({ code: 2, msg: 'Bạn cần đăng nhập' })
    }
    next()
}

module.exports.permission =
    (permission = ['user', 'mod', 'admin']) =>
    ({ user }, res, next) => {
        if (!user) {
            return res.status(status.UNAUTHORIZED).send({ code: 2, msg: 'Bạn cần đăng nhập' })
        }
        if (!['sp_admin', ...permission].includes(user.role)) {
            return res.status(status.UNAUTHORIZED).send({ code: 2, msg: 'Bạn không đủ quyền' })
        }
        next()
    }
