import React from 'react'
import { Provider } from 'react-redux'
import { store } from './redux/reducers/task_reducer'
import TaskListCard from './components/TaskListCard'

function App() {
  return (
    <Provider store={store}>       
      <TaskListCard /> 
    </Provider>
  )
}

export default App