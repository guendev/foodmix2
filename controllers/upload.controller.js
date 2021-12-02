const { v4: uuidv4 } = require('uuid')
const status = require('http-status')
const fs = require('fs')

const Resize = require('../modules/image')
const Event = require('../events')

function _getImageSize(path) {
    let CGSize = { width: 100, height: 100 }
    switch (path) {
        case 'recipe':
            CGSize.width = 600
            CGSize.height = 320
            break
        case 'stepper':
            CGSize.width = 600
            CGSize.height = 320
            break
    }
    return CGSize
}

function _buildFileName(user, path) {
    let filePath = `/images/users/${user._id}/${path}`
    let fileName = `${uuidv4()}.jpg`
    return { filePath, fileName }
}

module.exports.single = async ({ file, body, user }, res) => {
    try {
        const { path } = body
        if (!['user', 'recipe', 'stepper'].includes(path)) {
            return res
                .status(status.FORBIDDEN)
                .json({ code: 1, data: '', msg: 'Endpoint không hợp lệ' })
        }
        let CGSize = _getImageSize(path)
        const resize = new Resize(file.path)
        const dataJPG = await resize.resize(CGSize.width, CGSize.height)

        let { filePath, fileName } = _buildFileName(user, path)
        fs.mkdirSync(`public${filePath}`, { recursive: true })
        await fs.writeFileSync(`public${filePath}/${fileName}`, dataJPG)

        Event.removeFile(file.path)
        return res.json({ code: 2, data: filePath + '/' + fileName, msg: 'Upload thành công' })
    } catch (e) {
        console.log(e)
        Event.removeFile(file.path)
        return res.json({ code: 2, msg: 'Upload thất bại' })
    }
}
