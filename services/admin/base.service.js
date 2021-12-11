class BaseService {
    /**
     * @param user {User}
     */
    constructor(user) {
        if (!user) {
            throw new Error('Bạn không có quyền truy cập')
        }
        this.user = user
    }

    isMod() {
        return ['mod', 'admin'].includes(this.user.role)
    }

    isModQuery(field = 'user') {
        return {
            [field]: this.isMod() ? { $exists: true } : this.user._id
        }
    }

    /**
     * @param filter { Object }
     */
    mergeQuery(filter) {
        return Object.assign({}, filter, this.isModQuery())
    }
}
module.exports = BaseService
