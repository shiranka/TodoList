import TaskForm from './TaskForm'
import TasksList from './TasksList'
import Fab from '@material-ui/core/Fab'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import Card from '@material-ui/core/Card'
import AddIcon from '@material-ui/icons/Add'
import Tooltip from '@material-ui/core/Tooltip'
import DeleteIcon from '@material-ui/icons/Delete'
import RemoveIcon from '@material-ui/icons/Remove'
import { withStyles } from '@material-ui/core/styles'
import CardHeader from '@material-ui/core/CardHeader'
import IconButton from '@material-ui/core/IconButton'
import CardActions from '@material-ui/core/CardActions'
import FilterListIcon from '@material-ui/icons/FilterList'
import { changeIsHideListFlagAction, deleteCheckedTasksAction } from '../redux/actions/task_action'

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: 20,
    paddingTop: 10,
    minHeight: 580,
    maxHeight: 580,
    borderRadius: 6,
    marginLeft: 20,
    marginTop: 20,
    maxWidth: 480
  },
  endOfCard: {
    marginLeft: 'auto'
  },
  fab: {
    marginLeft: 'auto'
  },
  form: {
    width: 400
  }
 }

function ListItemCard({ classes }) {
    const dispatch = useDispatch() 
    const [filtered, setFilter] = useState(false)
    const [isFormOpen, setIsFormOpen] = useState(false)
    
    const changeFormState = () => setIsFormOpen(!isFormOpen)
    const deleteCheckedTasks = () => dispatch(deleteCheckedTasksAction())
    const filterList = () => {
        dispatch(changeIsHideListFlagAction())
        setFilter(!filtered)
    }
    
    return (
        <Card className={classes.root} >
            <CardHeader
                action={
                <div>
                    <Tooltip title='Delete All Checked Tasks'>
                        <IconButton onClick={deleteCheckedTasks} >
                            <DeleteIcon />
                        </IconButton > 
                    </Tooltip>
                    <Tooltip title='Filter Checked Tasks'>
                        <IconButton color={filtered ? 'secondary' : 'default'}>
                            <FilterListIcon onClick={filterList} />
                        </IconButton>
                    </Tooltip>
                </div>
                }
                title='Your Tasks For Today:'
            />
            <TasksList /> 
            <div>        
                <CardActions disableSpacing className={classes.endOfCard} >
                    <Card style={ isFormOpen ? { visibility: 'visible'} : { visibility: 'hidden'} }
                        className={classes.form}>
                        <TaskForm />
                    </Card>
                    <Fab size='medium' color='secondary' onClick={changeFormState} aria-label='add' className={classes.fab}>
                        { isFormOpen ? <RemoveIcon /> : <AddIcon /> } 
                    </Fab>  
                </CardActions>
            </div>
        </Card>
    )
}

export default withStyles(styles)(ListItemCard)