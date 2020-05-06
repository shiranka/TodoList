import React from 'react'
import { Provider } from 'react-redux'
import { store } from './redux/reducers/task_reducer'
import ListItemCard from './components/ListItemCard'

function App() {
  return (
    <Provider store={store}> 
      <ListItemCard />

    </Provider>
  )
}

export default App