const mongoose = require('mongoose')

const options = {
    autoIndex: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}

const connectWithRetry = async () => {
    console.log('MongoDB connection with retry')

    try {
        await mongoose.connect(process.env.MONGODB_URL, options)
        console.log('MongoDB connected!')
    } catch (e) {
        console.log(e)
        console.log('MongoDB connection unsuccessful, retry after 5 seconds.')
        setTimeout(connectWithRetry, 5000)
    }
}
const database = {
    connect: connectWithRetry
}

module.exports = database
