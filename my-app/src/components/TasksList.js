import React from 'react'
import Task from './Task'
import { useSelector } from 'react-redux'
import ListItem from "@material-ui/core/ListItem"
import { withStyles } from '@material-ui/core/styles'
import ListItemText from "@material-ui/core/ListItemText"

const styles = {
    root: {
        overflow: "auto",
        minHeight: 400, 
        maxHeight: 400
    }
}

const TasksList = (props) => {
    const tasks = useSelector((state) => state.tasks)
    const isHideTasks = useSelector((state) => state.isHideTasks)
    
    const tasksList = tasks.length ? (
        tasks.map(task => {
            if (!(isHideTasks && task.status)) {                 
                return (
                    <div key={task.id}>     
                        <Task task={task}/>
                    </div>
                )}})) : ( 
                <ListItem divider="true">
                    <ListItemText primary="You have no tasks left, yay!" />
                </ListItem>                               
        )
    
    return (        
        <div className={props.classes.root}>
            { tasksList }
        </div>        
    )
}

export default withStyles(styles)(TasksList)