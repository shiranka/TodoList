import React from 'react'
import Task from './Task'
import { useSelector } from 'react-redux'
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"

const TasksList = () => {
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
            <List > 
                <ListItem divider="true">
                    <ListItemText primary="You have no tasks left, yay!" />
                </ListItem>               
            </List>
        )
    
    return (
        <div> 
            <List> 
                { tasksList }
            </List>
        </div>
    )
}

export default TasksList