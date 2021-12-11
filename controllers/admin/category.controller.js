const status = require('http-status')

const CategoryService = require('../../services/admin/category.service')

const Event = require('../../events')

module.exports.getAll = async ({ user }, res) => {
    const categoryService = new CategoryService(user)
    const results = await categoryService.getAll()
    return res.json({ code: 1, data: results })
}

module.exports.update = async ({ user, params, body }, res) => {
    const categoryService = new CategoryService(user)
    const { name, avatar, content } = body
    const result = await categoryService.update(
        { slug: params.slug },
        { name, avatar: avatar || 'https://i.imgur.com/mVqk1d3.jpg', content: content || '' }
    )
    if (!result) {
        return res.status(status.NOT_FOUND).json({ code: 2, msg: 'Phân loại không tồn tại' })
    }
    return res.json({ code: 2, msg: 'Cập nhật thành công', data: result })
}

module.exports.delete = async ({ user, params }, res) => {
    const categoryService = new CategoryService(user)
    const result = await categoryService.delete({ slug: params.slug })
    if (!result) {
        return res.status(status.NOT_FOUND).json({ code: 2, msg: 'Phân loại không tồn tại' })
    }
    return res.json({ code: 2, msg: 'Xoá thành công' })
}
