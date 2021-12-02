require('dotenv').config({ path: '../../.env' })

const Category = require('../../models/Category')
const Recipe = require('../../models/Recipe')
const User = require('../../models/User')

const RecipeService = require('../../services/recipe.service')

const db = require('../../database')

db.connect()

const step = {
    content:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=160&ixid=MXwxfDB8MXxhbGx8fHx8fHx8fA&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=300'
}

let food = {
    name: 'Thịt Bò Xào Sả Ớt',
    avatar: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=160&ixid=MXwxfDB8MXxhbGx8fHx8fHx8fA&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=300',
    content:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
    category: '',
    ingredients: [
        {
            name: 'Rau Ngò',
            count: 10,
            unit: 'gram'
        },
        {
            name: 'Thịt Heo',
            count: 500,
            unit: 'gram'
        },
        {
            name: 'Măng muối',
            count: 300,
            unit: 'gram'
        },
        {
            name: 'Bột Ngọt',
            count: 1,
            unit: 'Thìa'
        },
        {
            name: 'Mật Ong',
            count: 200,
            unit: 'gram'
        },
        {
            name: 'Hành Lá',
            count: 10,
            unit: 'gram'
        }
    ],
    stepper: [step, step, step, step, step],
    time: 1800,
    preparation: 7657
}

async function f() {
    await Recipe.deleteMany()
    const category = await Category.findOne()
    const user = await User.findOne()
    let insertData = Object.assign({}, food, { category: category._id, user: user._id })
    for (let i = 0; i < 50; i++) {
        await Recipe.create(insertData)
    }
}

// f()

async function f1() {
    const data = await Recipe.aggregate([
        {
            $match: {
                _id: {
                    $ne: '619db1c931ee058f9292f987'
                }
            }
        },
        { $sample: { size: 10 } },
        {
            $lookup: {
                from: 'users',
                localField: 'user',
                foreignField: '_id',
                as: 'user'
            }
        },
        { $unwind: '$user' }
    ])
    console.log(data[0])
}

f1()
