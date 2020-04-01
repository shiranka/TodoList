import React, { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteTaskAction} from '../redux'


const TasksList = () => {
    const tasks = useSelector((state) => state.tasks)
    const dispatch = useDispatch()
    
    const deleteTask = useCallback((id) => () => {
        dispatch(deleteTaskAction(id))
    }, [dispatch])
    
    const tasksList = (tasks.length) ? (
        tasks.map(task => {
            return (
                <div className="collection-item" key={task.id}>
                <span>{task.content}</span>
                <button onClick={deleteTask(task.id)}>x</button>
                </div>
            )
        })) : ( <p>You have no tasks left, yay!</p> )
    
    return (
        <div> 
            { tasksList }
        </div>
    )
}

export default TasksList