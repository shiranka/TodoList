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
    }
}
  
const TaskForm = (props) => {
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
                    x: task.x,
                    y: task.y
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
            <form onSubmit={addTask} className={props.classes.root}>
                <IconButton onClick={addTask} >
                    <AddIcon />
                </IconButton >
                <div className={props.classes.root}>
                    <FormControlLabel                        
                        control={
                            <InputBase
                                name="content"    
                                style={{width: 200}}
                                value={task.content}
                                onChange={wirteTask}
                                placeholder="New Task..."
                            />
                        }     
                        label= "["   
                    />
                    <div className={props.classes.root}>
                        <FormControlLabel                        
                            label= ","
                            control={
                                <InputBase
                                    style={{width: 60}}
                                    value={task.x}
                                    name="x"
                                    onChange={wirteTask}
                                    placeholder="x"
                                />
                            }  
                        />
                        <FormControlLabel 
                            label= "]"           
                            control={
                                <InputBase
                                    name="y"
                                    style={{width: 60}}
                                    value={task.y}
                                    onChange={wirteTask}
                                    placeholder="y"
                                />
                            }        
                        />
                    </div>
                </div>
            </form>
        </div>
    )    
}

export default withStyles(styles)(TaskForm)