const express = require('express')
const api = require('./api')

let router = express.Router()

router.use('/api', api)

module.exports = router
