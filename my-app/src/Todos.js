import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteTodoAction} from './redux.js'


const Todos = () => {
    const todos = useSelector((state) => state.todos)
    const dispatch = useDispatch()
    const deleteTodo = (id) => dispatch(deleteTodoAction(id))   
    
    const todoList = (todos.length) ? (
        todos.map(todo => {
            return (
                <div className="collection-item" key={todo.id}>
                <span>{todo.content}</span>
                <button onClick={() => deleteTodo(todo.id)}>x</button>
                </div>
            )
        })) : ( <p>you have no todos left, yay</p> )
    
    return (
        <div> 
            { todoList }
        </div>
    )
}

export default Todos 