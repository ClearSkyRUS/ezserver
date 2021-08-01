const config = {
        certPaths: {
                key: '',
                cert: ''
        },
        mongoConnection: 'mongodb://localhost/...',
        mongoAuth: {"auth":{"authSource": "admin"}, "user": "admin", "pass": ""},
        telegramToken: '',
        port: 3003,
        https: false
}

export default config;