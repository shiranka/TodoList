import React from 'react'
import { Provider } from 'react-redux'
import TasksTable from './components/TasksTable'
import ListItemCard from './components/ListItemCard'
import { withStyles } from '@material-ui/core/styles'
import { store } from './redux/reducers/task_reducer'

const styles = {
  root: {
    display: "flex",
    flexDirection: "row"
  }
}

function App(props) {
  return (
    <Provider store={store} >
      <div className={props.classes.root}>
        <ListItemCard />
        <TasksTable />
      </div>
    </Provider>
  )
}

export default withStyles(styles)(App)