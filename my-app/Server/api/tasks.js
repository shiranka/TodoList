const express = require('express')
const router = express.Router()

const Task = require('../models/task')

router.get('/', (req, res) => {
    try {Task.find()
            .then(tasks => res.json(tasks))
            .catch(err => res.status(404))
    } catch (err) {
        throw Error("can't get tasks from db" + err.massage())
    }
})

router.post('/', (req, res) => {
    try {
        const newTask = new Task({
        content: req.body.content,
        coordinates: req.body.coordinates,
        status: false
        })    
        newTask.save()
            .then(Task => res.json(Task))
    } catch (err) {
        throw Error("can't add task to db" + err.massage())
    }
})

router.patch('/update', (req, res) => {
    let newStatus = { "status": !req.body.status}
    let id = {"_id": req.body._id }
    try {
        Task.update(id, newStatus)
        .then(Task => res.json(Task))
    } catch (err) {
        throw Error("can't update task's status" + err.massage())
    }
        
})

router.delete('/:id',(req, res) => {
    try {
        Task.findById(req.params.id)
            .then(task => task.remove().then(() => res.json({success: true})))
    } catch (err) {
        throw Error("can't delete task" + err.massage())
    }
})

router.get('/deleteChecked', (req, res) => {
    try {
        Task.deleteMany({ status: true })
        .then(() => res.json({success: true}))
    } catch (err) {
        throw Error("can't delete checked tasks" + err.massage())
    }
})

module.exports = router