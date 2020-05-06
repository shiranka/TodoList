import moment from 'moment'
import { useDispatch } from 'react-redux'
import AddIcon from '@material-ui/icons/Add'
import InputBase from '@material-ui/core/InputBase'
import React, { useState, useCallback } from 'react'
import IconButton from "@material-ui/core/IconButton"
import { addTaskAction } from '../redux/actions/task_action'
import FormControlLabel from '@material-ui/core/FormControlLabel'

const TaskForm = () => {
    const [task, setTask] = useState('')
    const dispatch = useDispatch();
   
    const wirteTask = useCallback((task_content) => {
        setTask(task_content)
    }, [setTask])
    
    const addTask = useCallback(e => {
        e.preventDefault()
        if(task){
            dispatch(addTaskAction({
                id: Math.random(),
                date: moment().format("MMM Do YY"),
                content: task
            }))        
        setTask('')}
    }, [setTask, task, dispatch])

    return(
        <div>
            <form onSubmit={addTask}>
                <IconButton onClick={addTask} >
                    <AddIcon />
                </IconButton >
                <FormControlLabel                        
                    control={
                        <InputBase
                            value={task}
                            onChange={(e) => wirteTask(e.target.value)}
                            placeholder="New Task..."
                        />
                    }        
                />              
            </form>
        </div>
    )    
}

export default TaskForm