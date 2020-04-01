import React from 'react'
import TasksList from './components/TasksList'
import TaskForm from './components/TaskForm'
import { Provider } from 'react-redux'
import { store } from './redux'

function App() {
  return (
    <Provider store={store}>
      <div>
        <h1>Your tasks for today:</h1>
        <TasksList />
        <TaskForm />
      </div>
    </Provider>
  )
}

export default App;