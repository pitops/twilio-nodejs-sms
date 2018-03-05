const bodyParser = require('body-parser')
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')

const index = require('./routes/index')

const app = express()

const port = process.env.PORT || 3000

app.use(helmet())
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use('/', index)

app.listen(port, () => console.log(`Server listening on port ${port}!`))
