const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config()
require('./database/index')
const { userRouters, taskRouters } = require('./routers')

app.use(express.json())

app.use('/api/users', userRouters)
app.use('/api/tasks', taskRouters)


const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log('Listening on port ' + PORT);
})

