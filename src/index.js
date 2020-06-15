const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('server is up on port', port);
})

const Task = require('./models/task')
const User = require('./models/user')

const main = async() => {
    // const task = await Task.findById('5ee6006c552fcc2b405ee24c')
    // await task.populate('owner').execPopulate()
    // console.log(task.owner)

    // const user = await User.findById('5ee5ff9b6132ec655c8a12a8')
    // await user.populate('tasks').execPopulate()
    // console.log(user.tasks)
}

main()