require('dotenv').config({ path: '../../.env' })

const User = require('../../models/User')
const UserService = require('../../services/user.service')

const db = require('../../database')
db.connect()
;(async () => {
    await User.findOneAndUpdate({ email: 'dnstylish@gmail.com' }, { role: 'sp_admin' })
    await User.findOneAndUpdate({ email: 'demo@foodmix.xyz' }, { role: 'admin' })
})()
