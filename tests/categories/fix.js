require('dotenv').config({ path: '../../.env' })

const Category = require('../../models/Category')

const db = require('../../database')
db.connect()
;(async () => {
    const all = await Category.updateMany({
        avatar: 'https://i.imgur.com/mVqk1d3.jpg',
        content:
            "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English."
    })
})()
