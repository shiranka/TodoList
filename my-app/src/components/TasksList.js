import Task from './Task'
import React, { useEffect } from 'react'
import ListItem from '@material-ui/core/ListItem'
import { withStyles } from '@material-ui/core/styles'
import { useSelector, useDispatch } from 'react-redux'
import ListItemText from '@material-ui/core/ListItemText'
import { getTasksAction } from '../redux/actions/task_action'

const styles = {
    root: {
        overflow: 'auto',
        minHeight: 450, 
        maxHeight: 450
    }
}

const TasksList = ({ classes }) => {
    const dispatch = useDispatch()
    const isHideTasks = useSelector(state => state.isHideTasksList)
    const tasksFromdb = useSelector(state => state.tasks)
    const tasks = isHideTasks ? tasksFromdb.filter(task => !task.status) : tasksFromdb
  
    useEffect(() => dispatch(getTasksAction()), [])
    
    const tasksList = tasks.length ? (
        tasks.map(task => {
            return (
                <div key={task._id}>     
                    <Task task={task}/>
                </div>
            )})) : ( 
                <ListItem divider='true'>
                    <ListItemText primary='You have no tasks left, yay!' />
                </ListItem>                               
        )
    
    return (        
        <div className={classes.root}>
            { tasksList }
        </div>        
    )
}

export default withStyles(styles)(TasksList)