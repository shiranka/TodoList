import { createStore } from 'redux'

const initialState = {
    isHideTasks: false,
    tasks: [
        {id: 1, content: 'buy some milk', status: true},
        {id: 24, content: 'buy some milk', status: true},
        {id: 11, content: 'buy some milk', status: true},
        {id: 21, content: 'buy some milk', status: true},
        {id: 12, content: 'buy some milk', status: true},
        {id: 13, content: 'buy some milk', status: true},
        {id: 31, content: 'buy some milk', status: true},
        {id: 14, content: 'buy some milk', status: true},
        {id: 15, content: 'buy some milk', status: true},
        {id: 16, content: 'buy some milk', status: true},
        {id: 17, content: 'buy some milk', status: true},
        {id: 18, content: 'buy some milk', status: true},
        {id: 135, content: 'buy some milk', status: true},
        {id: 2, content: 'play with my dogs', status: false}
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
