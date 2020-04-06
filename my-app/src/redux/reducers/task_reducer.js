export function reducer(state, {type, payload}){
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
