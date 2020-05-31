import React from 'react'
import { Provider } from 'react-redux'
import TasksTable from './components/TasksTable'
import ListItemCard from './components/ListItemCard'
import { withStyles } from '@material-ui/core/styles'
import { store } from './redux/reducers/task_reducer'
import TasksLocations from './components/TasksLocations'

const styles = {
  root: {
    display: "flex",
    flexDirection: "row"
  },
  right: {
    display: "flex",
    flexDirection: "column"
  }
}

function App({ classes }) {
  return (
    <Provider store={store} >
      <div className={classes.root}>
        <ListItemCard />
        <div className={classes.right}>
          <TasksTable />
          <TasksLocations />
        </div>
      </div>
    </Provider>
  )
}

export default withStyles(styles)(App)