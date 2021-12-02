require('dotenv').config({ path: '../../.env' })

const User = require('../../models/User')
const UserService = require('../../services/user.service')

const db = require('../../database')
db.connect()
;(async () => {
    const user = await User.findOneAndUpdate({ email: 'dnstylish@gmail.com' })
    await UserService.updatePassword(user._id, 'Khoi@025')
})()
