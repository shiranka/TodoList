import { useDispatch } from 'react-redux'
import React, { useCallback } from 'react'
import ListItem from "@material-ui/core/ListItem"
import Checkbox from '@material-ui/core/Checkbox'
import DeleteIcon from "@material-ui/icons/Delete"
import { makeStyles } from '@material-ui/core/styles'
import IconButton from "@material-ui/core/IconButton"
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { deleteTaskAction, changeStatusAction } from '../redux/actions/task_action'

const useStyles = makeStyles(theme => ({
  root: {
    width: 400,
    margin:"auto" ,
    marginBottom: 5,
    '&:hover': {
        '& $child2': {
            display:"none"
            // color: 'secondary'
        }}
    },
}))

const Task = ({ task }) => {
    const classes = useStyles()  
    const dispatch = useDispatch()
  
    const changeStatus = useCallback((id) => () => {
        dispatch(changeStatusAction(id))
    }, [dispatch])
    
    const deleteTask = useCallback((id) => () => {
        dispatch(deleteTaskAction(id))
    }, [dispatch])

    const taskVeiw = (
        <div style={{display:"flex" }}>
        <ListItem divider="true" className={classes.root}>
            <FormControlLabel style={task.status ? ({ textDecoration: 'line-through'}) : {}}                      
                control={                
                    <Checkbox
                        checked={task.status}
                        onChange={changeStatus(task.id)}
                        color="primary"
                    />      
                }
                label={task.content}
            />  
            <IconButton onClick={deleteTask(task.id)} >
                <DeleteIcon />
            </IconButton >
        </ListItem>
    </div>
    )

    return(
        <div> 
            { taskVeiw }
        </div>
    )
}

export default Task