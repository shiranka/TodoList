import { createStore } from 'redux'

const initialState = {
    tasks: [
        {id: 1, content: 'buy some milk'},
        {id: 2, content: 'play with my dogs'}
    ]
}

export const store = createStore(
    reducer,
    initialState
)

function reducer(state, {type, payload}){
    switch(type){
        case 'ADD_TASK':
            return {
                ...state,
                tasks: [...state.tasks, payload]  
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
        default:
            return state
    }
}
