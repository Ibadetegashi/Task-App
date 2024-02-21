const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager')
    .then(results => {
        console.log("Connected to MongoDB")
    })
    .catch(err => {
        console.error("Could not connect to MongoDB", err)
    })
