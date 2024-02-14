//using mongodb package
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;

const mongoUrl = 'mongodb://127.0.0.1:27017';
const dbName = 'task-app';
MongoClient.connect(mongoUrl)
    .then((client) => {
        console.log("Conncected successfully");
        const db = client.db(dbName)
        db.collection("users").insertMany([
            {
                name: "John Doe",
                age: 25
            },
            {
                name: "Jane Smith",
                age: 30
            }
        ])
            .then((res) => { console.log(res) })
            .catch((err) => { console.error(err) })
    }
    )
    .catch((err) => console.error(err));

