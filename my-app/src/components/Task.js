import { useDispatch } from 'react-redux'
import React, { useCallback } from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import Checkbox from '@material-ui/core/Checkbox'
import ListItem from '@material-ui/core/ListItem'
import DeleteIcon from "@material-ui/icons/Delete"
import { makeStyles } from '@material-ui/core/styles'
import IconButton from "@material-ui/core/IconButton"
import Typography from '@material-ui/core/Typography'
import ListItemText from '@material-ui/core/ListItemText'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { deleteTaskAction, changeStatusAction } from '../redux/actions/task_action'

const useStyles = makeStyles({
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
  },
})

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
        <ListItem divider="true"  className={classes.root}  secondary={task.date} >   
            <FormControlLabel                       
                control={                
                    <Checkbox
                        checked={task.status}
                        onChange={changeStatus(task.id)}
                        color="primary"
                    />      
                }
                label={ <ListItemText primary={<Typography style={task.status ? ({ textDecoration: 'line-through'}) : {}} >{task.content}</Typography>}
                 secondary={task.date} />}
            />      
            <Tooltip title="Delete Task">
                <IconButton onClick={deleteTask(task.id)} className={classes.clearIndicator}>
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

export default Task