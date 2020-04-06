import React, { useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { addTaskAction } from '../redux'

const TaskForm = () => {
    const [task, setTask] = useState('')
    const dispatch = useDispatch()
   
    const handleChange = useCallback((e) => {
        setTask(e.target.value)
    }, [setTask])
    
    const handleSubmit = useCallback((e) => {
        e.preventDefault()
        dispatch(addTaskAction({
            id: Math.random(),
            content: task
        }))        
        setTask('')
    }, [setTask, task, dispatch])

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <label>Add new task:</label>
                <input
                    type="text"
                    onChange={handleChange}
                    placeholder='Add a task...'
                    value={task}
                />
            </form>
        </div>
    )    
}

export default TaskForm