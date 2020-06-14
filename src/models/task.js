const mongoose = require("mongoose")
const validator = require("validator")
const { ObjectID } = mongoose.Schema.Types

const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        trim: true,
        required: true,
        min: 5
    },
    completed: {
        type: Boolean,
        default: false
    },
    owner: {
        type: ObjectID,
        require: true,
        ref: 'User'
    }
})

taskSchema.pre('save', async function(next) {
    const task = this

    // if(task.isModified('password')){

    // }
    next()
})

const Task = mongoose.model('Task', taskSchema)

module.exports = Task;