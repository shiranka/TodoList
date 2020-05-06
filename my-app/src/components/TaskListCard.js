import Fade from '@material-ui/core/Fade'
import React, { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import Card from '@material-ui/core/Card'
import TasksList from './TasksList'
import Tooltip from '@material-ui/core/Tooltip'
import { makeStyles } from '@material-ui/core/styles'
import AddIcon from '@material-ui/icons/Add'
import Fab from '@material-ui/core/Fab'
import CardHeader from '@material-ui/core/CardHeader'
import IconButton from '@material-ui/core/IconButton'
import CardActions from '@material-ui/core/CardActions'
import DeleteIcon from '@material-ui/icons/Delete'
import FilterListIcon from '@material-ui/icons/FilterList'
import { changeIsHideFlagAction, deleteCheckedTasksAction } from '../redux/actions/task_action'
   
const useStyles = makeStyles({
  card: {
    overflow: 'auto',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',  
    height: 500,
    width: 400,
    margin:"auto" ,
    marginTop: 40,
    borderRadius: 10,
    padding: 25
  },
})

function TaskListCard() {
    const classes = useStyles()  
    const dispatch = useDispatch()
    const [clickedFilter, setClickedFilter] = useState(false)
    const [isShowForm, setIsShowForm] = useState(false)

    const deleteCheckedTasks = useCallback (() => dispatch(deleteCheckedTasksAction()), [dispatch])
    
    const handleFilterClick = useCallback(() =>  {
        dispatch(changeIsHideFlagAction())
        setClickedFilter(!clickedFilter)
    }, [dispatch,setClickedFilter,clickedFilter])
    
    const didFormCall = () => setIsShowForm((prev) => !prev)
    
    return (
      <div>
    <Card  className={classes.card} variant="scrollable"> 
        <CardHeader
          action={
            <div>
                <Tooltip title="Delete All Checked Tasks">
                    <IconButton onClick={deleteCheckedTasks} >
                        <DeleteIcon />
                    </IconButton >
                </Tooltip>
                <Tooltip title="Filter Checked Tasks">
                    <IconButton onClick={handleFilterClick} color={clickedFilter ? 'secondary' : 'defulte'}>
                        <FilterListIcon />
                    </IconButton >
                </Tooltip>
            </div>
          }
          title="Tasks:"
        />
        <TasksList />         
        {/* <CardActions disableSpacing>
            <Tooltip title="Add New Task" aria-label="add">
                <Fab color="secondary" onClick={didFormCall}>
                    <AddIcon />
                </Fab>
            </Tooltip>
            <Fade in={isShowForm}>
    <Card className={classes.card}>
    <CardHeader
          action={
            <div>
                <Tooltip title="Delete All Checked Tasks">
                    <IconButton onClick={deleteCheckedTasks} label="click here">
                        <DeleteIcon />
                    </IconButton >
                </Tooltip>
                <Tooltip title="Filter Checked Tasks">
                    <IconButton onClick={isHideFlag} >
                        <FilterListIcon />
                    </IconButton >
                </Tooltip>
            </div>
          }
          title="kkkkkk:"
        />
        <TasksList /> 
    </Card>
  </Fade>                    
        </CardActions> */}
    </Card>
    
  </div>)
}

export default TaskListCard