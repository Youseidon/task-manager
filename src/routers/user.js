const express = require('express')
const User = require("../models/user")
const router = new express.Router()

router.post('/users', async(req, res) => {
    const user = new User(req.body);
    try {
        await user.save()
        res.status(201).send(user);
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
    // user.save().then((value) => {
    //     res.status(201).send(value)
    // }).catch((reason) => {
    //     res.status(400).send(reason)
    // })
})

router.get('/users', async(req, res) => {
    try {
        const users = await User.find({});
        res.send(users)
    } catch (e) {
        res.send(e)
    }
    // User.find({}).then((value) => {
    //     res.send(value)
    // }).catch((reason) => {
    //     res.status(500).send(reason)
    // });
})
router.get('/users/:id', async(req, res) => {
    const _id = req.params.id;
    try {
        const user = await User.findById(_id);
        if (!user) {
            return res.status(404).send();
        }
        res.send(users);
    } catch (e) {
        res.status(500).send()
    }
    // User.findById(_id).then((value) => {
    //     if (!value) {
    //         return res.status(404).send();
    //     }
    //     res.status(302).send(value)
    // }).catch((reason) => {
    //     res.status(505).send(reason);
    // });
})
router.post('/users/login', async(req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        res.send(user)
    } catch (e) {
        res.status(400).send()
    }
})
router.patch('/users/:id', async(req, res) => {
    try {
        const updates = Object.keys(req.body);
        const allowedUpdates = ['name', 'email', 'password', 'age'];
        const isValidOperation = updates.every(update => allowedUpdates.includes(update));
        if (!isValidOperation) {
            throw new Error({ error: 'Invalid operation' })
        }

        // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        const user = await User.findById(req.params.id);
        updates.forEach(update => user[update] = req.body[update]);
        await user.save()

        if (!user) {
            return res.status(404).send();
        }

        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/users/:id', async(req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)

        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(500).send(e);
    }
})
module.exports = router;