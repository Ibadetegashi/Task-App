const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager')
    .then(results => {
        console.log("Connected to MongoDB")
    })
    .catch(err => {
        console.error("Could not connect to MongoDB", err)
    })

const User = mongoose.model('User', {
    name: String,
    age: Number,
})

const me = new User({ name: "John Doe", age: 35 });
me.save().then(() => {
    console.log(`Saved user ${me.name} with age ${me.age}`);
    console.log(me);
})
    .catch((err) => {
        console.log(err);
    })