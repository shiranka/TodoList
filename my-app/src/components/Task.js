import moment from "moment"
import { useDispatch } from 'react-redux'
import React, { useCallback } from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import Checkbox from '@material-ui/core/Checkbox'
import ListItem from '@material-ui/core/ListItem'
import DeleteIcon from "@material-ui/icons/Delete"
import { withStyles } from '@material-ui/core/styles'
import IconButton from "@material-ui/core/IconButton"
import Typography from '@material-ui/core/Typography'
import ListItemText from '@material-ui/core/ListItemText'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { deleteTaskAction, changeStatusAction } from '../redux/actions/task_action'

const styles = {
  root: {
   '&:hover':{
        '& $clearIndicator': {
           visibility: "visible"
        }
    }
  },
  clearIndicator: {
    visibility: "hidden",
    color: "red",
    marginLeft: 'auto'
  }
}

const Task = (props) => {
    const task = props.task
    const dateAndPoint= ` ${moment(task.date).format("MMM Do YY")} at [${task.x},${task.y}]`
    const dispatch = useDispatch()
    
    const changeStatus = useCallback((taskToCheck) => () => {
        dispatch(changeStatusAction(taskToCheck))
    }, [dispatch])
    
    const deleteTask = useCallback((id) => () => {
        dispatch(deleteTaskAction(id))
    }, [dispatch])

    const taskVeiw = (
        <ListItem divider="true" className={props.classes.root} secondary={task.date} >   
            <FormControlLabel                       
                control={                
                    <Checkbox
                        checked={task.status}
                        onChange={changeStatus(task)}
                        color="primary"
                    />      
                }
                label={ <ListItemText primary={
                    <Typography style={ task.status ? ({ textDecoration: 'line-through'}) : {}} >
                        {task.content}
                    </Typography>}
                    secondary= {dateAndPoint}/>}
            />      
            <Tooltip title="Delete Task">
                <IconButton onClick={deleteTask(task._id)} className={props.classes.clearIndicator}>
                    <DeleteIcon />
                </IconButton >   
            </Tooltip>
        </ListItem>   
    )

    return(
        <div> 
            { taskVeiw }
        </div>
    )
}

export default withStyles(styles)(Task)