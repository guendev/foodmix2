const status = require('http-status')

module.exports.auth = ({ user }, res, next) => {
    if (!user) {
        return res.status(status.UNAUTHORIZED).send('Bạn cần đăng nhập')
    }
    next()
}
