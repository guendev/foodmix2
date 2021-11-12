const status = require('http-status')

module.exports = ({ user }, res, next) => {
    // user ko đăng nhập
    if (!user) {
        return res.status(status.FORBIDDEN).send('Bạn cần đăng nhập')
    }
    next()
}
