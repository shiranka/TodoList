import { useDispatch } from 'react-redux'
import AddIcon from '@material-ui/icons/Add'
import InputBase from '@material-ui/core/InputBase'
import React, { useState, useCallback } from 'react'
import { withStyles } from '@material-ui/core/styles'
import IconButton from "@material-ui/core/IconButton"
import { addTaskAction } from '../redux/actions/task_action'
import FormControlLabel from '@material-ui/core/FormControlLabel'

const styles = {
    root: {
      display: "flex",
      flexDirection: "row"
    },
    coordinates: {
        width: 60
    }, 
    content: {
        width: 200
    },
    coordinatePadding: {
        paddingRight: 22
    }
}
  
const TaskForm = ({ classes }) => {
    const [task, setTask] = useState({
        content: '',
        x: '',
        y: ''
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
        if(task.content && task.x && task.y){
            if(isNaN(task.x) || isNaN(task.y)){
                alert("X and Y should be numbers")
            } else {
                dispatch(addTaskAction({
                    content: task.content,
                    coordinates: [task.x, task.y]
                }))        
                setTask({
                    content: '',
                    x: '',
                    y: ''
                })
            }
        } else {
            alert("All fields are required")
        }
    }, [setTask, task, dispatch])

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
                <p className={classes.coordinatePadding}>[</p>
                    <FormControlLabel 
                        control={
                            <InputBase
                                className={classes.coordinates}
                                value={task.x}
                                name="x"
                                onChange={wirteTask}
                                placeholder="x"
                            />
                        }  
                    />
                    <p className={classes.coordinatePadding}>,</p>
                    <FormControlLabel 
                        control={
                            <InputBase
                                name="y"
                                className={classes.coordinates}
                                value={task.y}
                                onChange={wirteTask}
                                placeholder="y"
                            />
                        }        
                    />
                    <p className={classes.coordinatePadding}>]</p>
            </form>
        </div>
    )    
}

export default withStyles(styles)(TaskForm)