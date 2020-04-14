import React from 'react'
import Task from './Task'
import { useSelector } from 'react-redux'
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText";

const TasksList = () => {
    const tasks = useSelector((state) => state.tasks)
    
    const tasksList = (tasks.length) ? (
        tasks.map(task => {
            return (
                <div key={task.id}>     
                    <Task task={task}/>  
                </div>
        )})) : ( 
            <List> 
                <ListItem divider="true">
                    <ListItemText primary="You have no tasks left, yay!" />
                </ListItem>               
            </List>
        )
    
    return (
        <div> 
            { tasksList }
        </div>
    )
}

export default TasksList