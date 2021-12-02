module.exports.notFound = (req, res, next) => {
    return res.status(404).send('Not Found')
}

module.exports.errorHandler = (err, req, res) => {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    // render the error page
    res.status(err.status || 500)
    res.render('error')
}
