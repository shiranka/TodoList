import React, { useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { addTaskAction } from '../redux/actions/task_action'
import TextField from '@material-ui/core/TextField'

const TaskForm = () => {
    const [task, setTask] = useState('')
    const dispatch = useDispatch()
   
    const handleChange = useCallback((task_content) => {
        setTask(task_content)
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
                <TextField 
                    type="text"
                    onChange={(e) => handleChange(e.target.value)}
                    placeholder='Add a task...'
                    value={task}
                    label="New task"
                />                
            </form>
        </div>
    )    
}

export default TaskForm