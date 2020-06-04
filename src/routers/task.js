const express = require('express')
const Task = require('../models/task')
const router = new express.Router()

router.post('/tasks', async(req, res) => {
    const task = new Task(req.body);
    try {
        await task.save();
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
    // task.save().then((value) => {
    //     res.status(201).send(value)
    // }).catch((reason) => {
    //     res.status(400).send(reason)
    // });
})

router.get('/tasks', async(req, res) => {
    try {
        const task = await Task.find({});
        res.status(302).send(task);
    } catch (e) {
        res.status(500).send(e);
    }
    // Task.find({}).then((value) => {
    //     res.status(302).send(value);
    // }).catch((reason) => {
    //     res.status(500).send(reason)
    // })
})
router.get('/tasks/:id', async(req, res) => {
    const _id = req.params.id;
    try {
        const task = await Task.findById(_id);
        if (!task) {
            res.status(404).send();
        }
        res.status(302).send(task)
    } catch (e) {
        res.status(302).send(e);
    }
    // Task.findById(_id).then((value) => {
    //     if (!value) {
    //         return res.status(404).send();
    //     }
    //     res.status(302).send();
    // }).catch((reason) => {
    //     res.status(500)
    // });
})

router.patch('/tasks/:id', async(req, res) => {
    try {
        const updates = Object.keys(req.body);
        const allowedUpdates = ['completed', 'description'];
        const isAllowedOperation = updates.every(update => allowedUpdates.includes(update));
        if (!isAllowedOperation) {
            throw new Error('Invalid update operation')
        }
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!task) {
            res.status(404).send();
        }
        res.status(201).send(task);
    } catch (e) {
        res.status(500).send(e);
    }
})
router.delete('/tasks/:id', async(req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router