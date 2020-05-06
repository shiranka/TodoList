import { createStore } from 'redux'

const initialState = {
    isHideTasks: false,
    tasks: [
        {id: 1, content: 'buy some milk', date:"April 6th 20", status: true},
        {id: 2, content: 'play with my dogs', date:"June 5th 20", status: false}
    ]
}

export const store = createStore(
    reducer,
    initialState
)

function reducer(state, {type, payload}){
    switch(type){
        case 'DELETE_CHECKED_TASKS':{
            let tasks = state.tasks.filter(task => (task.status !== true))
            return {
                ...state,
                tasks
            }
        }
        case 'IS_HIDE_TASKS':{
            return {
                ...state,
                isHideTasks: !state.isHideTasks
            }
        }
        case 'ADD_TASK':{
            return {
                ...state,
                tasks: [...state.tasks, payload]  
            }
        }
        case 'DELETE_TASK':{ 
            let tasks = [...state.tasks]
            const taskPos = tasks.map((task) => {return task.id}).indexOf(payload)
            tasks.splice(taskPos, 1)  
            return {               
                ...state,                            
                tasks
            }
        }
        case 'CHANGE_STATUS':{
            let tasks = [...state.tasks]
            const taskPos = tasks.map((task) => {return task.id}).indexOf(payload)
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