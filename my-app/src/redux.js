import { createStore } from 'redux'

const initialState = {
    todos: [
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
        case 'add_todo':
            return {
                ...state,
                todos: [...state.todos, payload]  
            }
        case 'delete_todo':{ 
            let todos = [...state.todos]
            const todoPos = todos.map((x) => {return x.id; }).indexOf(payload)
            todos.splice(todoPos, 1)  
            return {               
                ...state,                            
                todos
            }
        }
        default:
            return state
    }
}

export const addTodoAction = (todo) => ({
    type: 'add_todo',
    payload: todo
})

export const deleteTodoAction = (id) => ({
    type: 'delete_todo',
    payload: id
})
