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
        case 'add_task':
            return {
                ...state,
                tasks: [...state.tasks, payload]  
            }
        case 'delete_task':{ 
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

export const addTaskAction = (task) => ({
    type: 'add_task',
    payload: task
})

export const deleteTaskAction = (id) => ({
    type: 'delete_task',
    payload: id
})
