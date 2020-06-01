const express = require('express')
require('./db/mongoose')
const User = require("./models/user")
const Task = require('./models/task')

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json())

app.post('/users', (req, res) => {
    const user = new User(req.body);
    user.save().then((value) => {
        res.status(201).send(value)
    }).catch((reason) => {
        res.status(400).send(reason)
    })
})

app.get('/users', (req, res) => {
    User.find({}).then((value) => {
        res.send(value)
    }).catch((reason) => {
        res.status(500).send(reason)
    });
})
app.get('/users/:id', (req, res) => {
    const _id = req.params.id;
    User.findById(_id).then((value) => {
        if (!value) {
            return res.status(404).send();
        }
        res.status(302).send(value)
    }).catch((reason) => {
        res.status(505).send(reason);
    });
})


app.post('/tasks', (req, res) => {
    const task = new Task(req.body);
    task.save().then((value) => {
        res.status(201).send(value)
    }).catch((reason) => {
        res.status(400).send(reason)
    });
})

app.get('/tasks', (req, res) => {
    Task.find({}).then((value) => {
        res.status(302).send(value);
    }).catch((reason) => {
        res.status(500).send(reason)
    })
})
app.get('/tasks/:id', (req, res) => {
    const _id = req.params.id;
    Task.findById(_id).then((value) => {
        if (!value) {
            return res.status(404).send();
        }
        res.status(302).send();
    }).catch((reason) => {
        res.status(500)
    });
})
app.listen(port, () => {
    console.log('server is up on port', port);
})