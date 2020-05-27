// const mongodb = require("mongodb")
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectID

const { MongoClient, ObjectID } = require("mongodb")

const connectionURL = 'mongodb://127.0.0.1:27017'
const databseName = 'task-manager'

const id = new ObjectID();
// console.log(id.getTimestamp());

MongoClient.connect(connectionURL, { "useNewUrlParser": true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to the database');
    }

    const db = client.db(databseName);
    db.collection('tasks').findOne({ _id: new ObjectID('5ece666f3b40294738ae7a6c') }, (error, result) => {
        if (error) {
            return console.log('Unable to fetch data')
        }
        console.log(result);
    })
    db.collection('tasks').find({ completed: false }).toArray(function(error, tasks) {
        if (error) {
            return console.log("unable to fetch data from tasks collection");
        }
        console.log(tasks);
    });

    // db.collection('users').insertOne({
    //     _id: id,
    //     name: 'Soghrat',
    //     age: 5600
    // }, (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert user');
    //     }
    //     console.log(result.ops);
    // });
    // db.collection('users').insertMany([{
    //         name: 'Jane',
    //         age: 28
    //     },
    //     {
    //         name: 'Abbas',
    //         age: 75
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log("Unable to insert documents")
    //     }
    //     console.log(result.ops);
    // })
    // db.collection('tasks').insertMany([{
    //         description: 'The task is completed',
    //         completed: true
    //     },
    //     {
    //         description: 'This is a very important task',
    //         completed: false
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log("this document is not good");
    //     }
    //     console.log(result.ops);
    // })
})