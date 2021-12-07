module.exports = {
    apps: [
        {
            name: 'foodmix',
            script: './bin/www',
            instances: 0,
            exec_mode: 'cluster',
            watch: true
        }
    ]
}
