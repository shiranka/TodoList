import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

const initialState = {
    isHideTasks: false,
    tasks: []
}

export const store = createStore(
    reducer,
    initialState,
    applyMiddleware(thunk)
)

function reducer(state, {type, payload}) {
    switch(type) {
        case 'GET_TASKS': {
            return{
                ...state,
                tasks: payload
            }
        }
        case 'DELETE_CHECKED_TASKS': {
            let tasks = state.tasks.filter(task => (task.status !== true))
            return {
                ...state,
                tasks
            }
        }
        case 'IS_HIDE_TASKS': {
            return {
                ...state,
                isHideTasks: !state.isHideTasks
            }
        }
        case 'ADD_TASK': {
            return {
                ...state,
                tasks: [...state.tasks, payload]  
            }
        }
        case 'DELETE_TASK': { 
            let tasks = [...state.tasks]
            const taskPos = tasks.map((task) => {return task._id}).indexOf(payload)
            tasks.splice(taskPos, 1)  
            return {               
                ...state,                            
                tasks
            }
        }
        case 'CHANGE_STATUS': {
            let tasks = [...state.tasks]
            const taskPos = tasks.map((task) => {return task._id}).indexOf(payload)
            tasks[taskPos].status = !(tasks[taskPos].status)
            return {
                ...state,                            
                tasks
            }
        }
        default:
            return state
    }
}