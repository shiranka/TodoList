import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTaskAction } from '../redux'

const TaskForm = () => {
    const [task, setTask] = useState('')
    const dispatch = useDispatch()
    const addTask = (task) => dispatch(addTaskAction(task))
    
    const handleChange = (e) => { setTask(e.target.value) }
    const handleSubmit = (e) => {
        e.preventDefault()
        addTask({
            id: Math.random(),
            content: task
        })
        setTask('')
    }    
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Add new task:</label>
                <input type="text" onChange={handleChange} placeholder='Add a task...' value={task}></input>
            </form>
        </div>
    )    
}

export default TaskForm