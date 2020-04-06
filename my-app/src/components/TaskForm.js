import React, { useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { addTaskAction } from '../redux/actions/task_action'

const TaskForm = () => {
    const [task, setTask] = useState('')
    const dispatch = useDispatch()
   
    const handleChange = useCallback((input) => {
        setTask(input)
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
                    onChange={(e) => handleChange(e.target.value)}
                    placeholder='Add a task...'
                    value={task}
                />
            </form>
        </div>
    )    
}

export default TaskForm