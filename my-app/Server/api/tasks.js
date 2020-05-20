const express = require('express')
const router = express.Router()

const Task = require('../models/task')

router.get('/', (req, res) => {
    Task.find()
        .then(tasks => res.json(tasks))
})

router.post('/', (req, res) => {
    const newTask = new Task({
        content: req.body.content,
        status: false
    })    
    newTask.save().then(Task => res.json(Task))
})

router.put('/update', (req, res) => {
    let newStatus = { "status": !req.body.status}
    let id = {"_id": req.body._id }
    Task.update(id, newStatus).then(Task => res.json(Task))
})

router.delete('/:id',(req, res) => {
    Task.findById(req.params.id)
    .then(task => task.remove().then(() => res.json({success: true})))
    .catch(err => res.status(404).json({success: false}))
})

router.get(`/deleteChecked/:ids`, (req, res) => {
    Task.remove({
        _id: { $in: req.params.ids.split(',') }
    }, function (err) {
        if (err) return res.send(err)
        Task.find({}, (err, tasks) => {
            if (err) return res.send(err)
            res.json(tasks)
        })
    })
})

module.exports = router