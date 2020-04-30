import React from 'react'
import { Provider } from 'react-redux'
import TasksList from './components/TasksList'
import { store } from './redux/reducers/task_reducer'
import Menu from './components/Menu'

function App() {
  return (
    <Provider store={store}>     
      <div>
        <Menu />
        <TasksList />        
      </div>
    </Provider>
  )
}

export default App;