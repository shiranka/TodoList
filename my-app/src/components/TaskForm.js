import AddIcon from '@material-ui/icons/Add'
import InputBase from '@material-ui/core/InputBase'
import React, { useState, useCallback } from 'react'
import { withStyles } from '@material-ui/core/styles'
import IconButton from "@material-ui/core/IconButton"
import { useSelector, useDispatch } from 'react-redux'
import { addTaskAction } from '../redux/actions/task_action'
import FormControlLabel from '@material-ui/core/FormControlLabel'

const styles = {
    root: {
      display: "flex",
      flexDirection: "row"
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
    const coordinates = useSelector((state)=> state.coordinates)
    const [task, setTask] = useState({
        content: '',
    })
    const dispatch = useDispatch();
   
    const wirteTask = useCallback( newTask => {
        setTask({
            ...task,
            [newTask.target.name]: newTask.target.value
        })
    }, [setTask, task])
    
    const addTask = useCallback(e => {
        e.preventDefault()
        if(task.content){
            dispatch(addTaskAction({ 
                content: task.content,
                coordinates
            }))        
            setTask({ content: '' })
        }
    }, [setTask, task, coordinates, dispatch])

    return(
        <div>
            <form onSubmit={addTask} className={classes.root}>
                <IconButton onClick={addTask} >
                    <AddIcon />
                </IconButton >
                <FormControlLabel                        
                    control={
                        <InputBase
                            name="content"   
                            value={task.content}
                            onChange={wirteTask}
                            placeholder="New Task..."
                        />
                    }     
                />
                <p className={classes.coordinatePadding}>
                    [ {parseFloat(coordinates[0]).toFixed(3)},{parseFloat(coordinates[1]).toFixed(3)} ]
                </p>
            </form>
        </div>
    )    
}

export default withStyles(styles)(TaskForm)