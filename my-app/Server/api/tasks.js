const express = require('express')
const router = express.Router()

const Task = require('../models/task')

router.get('/', (req, res) => {
    Task.find()
        .then(tasks => res.json(tasks))
        .catch(err => res.status(404))
})

router.post('/', (req, res) => {
    const newTask = new Task({
        content: req.body.content,
        status: false
    })    
    newTask.save()
        .then(Task => res.json(Task))
        .catch(err => res.status(404))
})

router.patch('/update', (req, res) => {
    let newStatus = { "status": !req.body.status}
    let id = {"_id": req.body._id }
    Task.update(id, newStatus)
        .then(Task => res.json(Task))
        .catch(err => res.status(404))
})

router.delete('/:id',(req, res) => {
    Task.findById(req.params.id)
    .then(task => task.remove().then(() => res.json({success: true})))
    .catch(err => res.status(404).json({success: false}))
})

router.get('/deleteChecked', (req, res) => {
    Task.deleteMany({ status: true }, function(err, result) {
        if (err) {
          res.send(err);
        } else {
          res.send(result);
        }
      })
})

module.exports = router