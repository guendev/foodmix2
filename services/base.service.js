module.exports = class {
    /**
     * @param limit
     * @returns {*|number}
     */
    static getLimit(limit) {
        const _limit = parseInt(limit)
        return _limit <= 20 ? _limit : 20
    }
}
