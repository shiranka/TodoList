import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { deleteTaskAction} from '../redux/actions/task_action'
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton"
import DeleteIcon from "@material-ui/icons/Delete"

const Task = (props) => {
    const dispatch = useDispatch()
    const task = props.task

    const deleteTask = useCallback((id) => () => {
        dispatch(deleteTaskAction(id))
    }, [dispatch])

    const taskVeiw = (
        <List>
            <ListItem divider="true">
                <IconButton onClick={deleteTask(task.id)}>
                    <DeleteIcon />
                </IconButton>
                <ListItemText primary={task.content} />
            </ListItem>
        </List> 
    )

    return(
        <div> 
            { taskVeiw }
        </div>
    )
}

export default Task