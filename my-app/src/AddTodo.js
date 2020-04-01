import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTodoAction } from './redux.js'

const AddTodo = () => {
    const [todo, setTodo] = useState('')
    const dispatch = useDispatch()
    const addTodo = (todo) => dispatch(addTodoAction(todo))
    
    const handleChange = (e) => { setTodo(e.target.value) }
    const handleSubmit = (e) => {
        e.preventDefault()
        addTodo({
            id: Math.random(),
            content: todo
        })
        setTodo('')
    }    
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Add new todo:</label>
                <input type="text" onChange={handleChange} placeholder='Add a todo...' value={todo}></input>
            </form>
        </div>
    )    
}

export default AddTodo