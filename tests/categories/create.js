require('dotenv').config({ path: '../../.env' })

const Category = require('../../models/Category')

const db = require('../../database')
db.connect();

(async ()=> {

  let list = ['Ăn Sáng', 'Ăn Vặt', 'Khai Vị', 'Món Chay', 'Làm Bánh', 'Nước Chấm', 'Lẩu', 'Gà', 'Bún Phở']

  for (const name of list) {
    const test = await Category.create({ name })
    console.log(test)
  }

})()
