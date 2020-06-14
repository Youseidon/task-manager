const express = require('express')
const Task = require('../models/task')
const router = new express.Router()
const auth = require('../middleware/auth')

router.post('/tasks', auth, async(req, res) => {
    const task = new Task({
        ...req.body,
        'owner': req.user._id
    })
    try {
        await task.save();
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/tasks', auth, async(req, res) => {
    try {
        // const task = await Task.find({ owner: req.user._id });
        await req.user.populate('tasks').execPopulate();
        res.status(302).send(req.user.tasks);
    } catch (e) {
        res.status(500).send(e);
    }
})
router.get('/tasks/:id', auth, async(req, res) => {
    const _id = req.params.id;
    try {
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id })
        if (!task) {
            res.status(404).send();
        }
        res.status(302).send(task)
    } catch (e) {
        res.status(302).send(e);
    }
})

router.patch('/tasks/:id', auth, async(req, res) => {
    try {
        const updates = Object.keys(req.body);
        const allowedUpdates = ['completed', 'description'];
        const isAllowedOperation = updates.every(update => allowedUpdates.includes(update));
        if (!isAllowedOperation) {
            throw new Error('Invalid update operation')
        }
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id });
        if (!task) {
            res.status(404).send();
        }
        updates.forEach(element => task[element] = req.body[element]);
        await task.save();
        res.status(201).send(task);
    } catch (e) {
        res.status(500).send(e);
    }
})
router.delete('/tasks/:id', auth, async(req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id })
        if (!task) {
            res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router