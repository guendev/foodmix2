require('dotenv').config()

const express = require('express')
const cors = require('cors')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

// Database
const db = require('./database')
db.connect()

const app = express()
// app.set('trust proxy', true)

app.use(cors())

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// setup app
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// Global Middleware
const userMiddleware = require('./middleware/user.middleware')
app.use(userMiddleware)

// setup router
const router = require('./routes')

app.use(router)

// catch 404 and forward to error handler
const { notFound, errorHandler } = require('./routes/error')
app.use(notFound)
app.use(errorHandler)

module.exports = app
