import { createStore } from 'redux'
import { reducer } from './reducers/task_reducer'

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