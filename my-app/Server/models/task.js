const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TaskSchema = new Schema ({
    content: {
        type: String,
        required: true
    },
    status:{
        type: Boolean
    },
    date: { 
        type: Date,
        default: Date.now
    }
})

module.exports = Task = mongoose.model('task', TaskSchema)