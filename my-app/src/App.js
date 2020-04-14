import React from 'react'
import NavBar from './components/NavBar'
import TasksList from './components/TasksList'
import TaskForm from './components/TaskForm'
import { Provider } from 'react-redux'
import { store } from './redux/reducers/task_reducer'

function App() {
  return (
    <Provider store={store}>     
      <div>
        <NavBar />
        <TasksList />
        <TaskForm />
      </div>
    </Provider>
  )
}

export default App;