import React, { useState } from 'react'
import AddIcon from '@material-ui/icons/Add'
import InputBase from '@material-ui/core/InputBase'
import { withStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import { useSelector, useDispatch } from 'react-redux'
import { addTaskAction } from '../redux/actions/task_action'
import FormControlLabel from '@material-ui/core/FormControlLabel'

const styles = {
    root: {
      display: 'flex',
      flexDirection: 'row'
    },
    coordinates: {
        width: 100
    }, 
    content: {
        width: 200
    },
    coordinatePadding: {
        paddingRight: 22
    }
}
  
const TaskForm = ({ classes }) => {
    const coordinates = useSelector(state=> state.coordinates)
    const [task, setTask] = useState('')
    const dispatch = useDispatch()
   
    const wirteTask = newTask => setTask(newTask.target.value)
    
    const addTask = e => {
        e.preventDefault()
        if(task) {
            dispatch(addTaskAction({ 
                content: task,
                coordinates
            }))        
            setTask('')
        }
    }

    return(
        <form onSubmit={addTask} className={classes.root}>
            <IconButton onClick={addTask} >
                <AddIcon />
            </IconButton >
            <FormControlLabel                        
                control = {
                    <InputBase
                        name='content'   
                        value={task}
                        onChange={wirteTask}
                        placeholder='New Task...'
                    />
                }     
            />
            <p className={classes.coordinatePadding}>
                [ {parseFloat(coordinates[0]).toFixed(3)}, {parseFloat(coordinates[1]).toFixed(3)} ]
            </p>
        </form>
    )    
}

export default withStyles(styles)(TaskForm)