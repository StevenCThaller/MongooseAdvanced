const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const apiRouter = require('./routes/api.routes')

require('./config/mongoose.config')

const app = express()

app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', apiRouter)

app.listen(8000, () => console.log("Server listening on port 8000"))