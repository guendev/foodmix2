const { check } = require('express-validator')

module.exports.getRecipes = () => {
    return [
        check('page', 'Page không được để trống').isNumeric(),
        check('limit', 'Limit không được để trống').isNumeric(),
        check('order').custom((value) => {
            if (
                !['createdAt', 'countRating', 'views', 'rating', 'preparation', 'time'].includes(
                    value
                )
            ) {
                throw new Error('Trường order không hợp lệ')
            }

            // Indicates the success of this synchronous custom validator
            return true
        })
    ]
}
