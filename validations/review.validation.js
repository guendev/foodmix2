const { check } = require('express-validator')

module.exports.postReview = () => {
    return [
        check('content', 'Nội sung review là bắt buộc').not().isEmpty(),
        check('content', 'Nội dung review không hợp lệ').isString(),
        check('content', 'Nội dung review quá ngắn').isLength({ min: 50 }),

        check('rating', 'Đánh giá là bắt buộc').not().isEmpty(),
        check('rating', 'Đánh giá phải là số').isNumeric(),
        check('rating').custom((value) => {
            if (value <= 0 || value > 5) {
                throw new Error('Rating phải lớn 0 và nhỏ hơn hoặc bằng 5')
            }
            return true
        })
    ]
}

module.exports.getReviews = () => {
    return [
        check('page', 'Page không được để trống').isNumeric(),
        check('limit', 'Limit không được để trống').isNumeric(),
        check('order').custom((value) => {
            if (!['createdAt', 'rating'].includes(value)) {
                throw new Error('Trường order không hợp lệ')
            }

            // Indicates the success of this synchronous custom validator
            return true
        })
    ]
}
