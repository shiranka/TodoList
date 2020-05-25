const express = require('express')
const router = express.Router()

const Task = require('../models/task')

router.get('/', (req, res) => {
    try {Task.find()
            .then(tasks => res.json(tasks))
            .catch(err => res.status(404))
    } catch (err) {
        throw "can't get tasks from db"
    }
})

router.post('/', (req, res) => {
    try {
        const newTask = new Task({
        content: req.body.content,
        x: req.body.x,
        y: req.body.y,
        status: false
        })    
        newTask.save()
            .then(Task => res.json(Task))
    } catch (err) {
        throw "can't add task to db"
    }
})

router.patch('/update', (req, res) => {
    let newStatus = { "status": !req.body.status}
    let id = {"_id": req.body._id }
    try {
        Task.update(id, newStatus)
        .then(Task => res.json(Task))
    } catch (err) {
        throw "can't update task's status"
    }
        
})

router.delete('/:id',(req, res) => {
    try {
        Task.findById(req.params.id)
            .then(task => task.remove().then(() => res.json({success: true})))
    } catch (err) {
        throw "can't delete task"
    }
})

router.get('/deleteChecked', (req, res) => {
    try {
        Task.deleteMany({ status: true })
        .then(() => res.json({success: true}))
    } catch (err) {
        throw "can't delete checked tasks"
    }
})

module.exports = router