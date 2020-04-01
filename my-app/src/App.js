import React from 'react'
import Todos from './Todos'
import AddTodo from './AddTodo'
import { Provider } from 'react-redux'
import { store } from './redux.js'

function App() {
  return (
    <Provider store={store}>
      <div>
        <h1>Todos:</h1>
        <Todos />
        <AddTodo />
      </div>
    </Provider>
  )
}

export default App;
