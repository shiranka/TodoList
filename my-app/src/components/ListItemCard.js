import TaskForm from './TaskForm'
import TasksList from './TasksList'
import Fab from '@material-ui/core/Fab'
import { useDispatch } from 'react-redux'
import Card from "@material-ui/core/Card"
import AddIcon from '@material-ui/icons/Add'
import Tooltip from '@material-ui/core/Tooltip'
import DeleteIcon from '@material-ui/icons/Delete'
import RemoveIcon from '@material-ui/icons/Remove'
import React, { useCallback, useState } from 'react'
import { withStyles } from '@material-ui/core/styles'
import CardHeader from "@material-ui/core/CardHeader"
import IconButton from "@material-ui/core/IconButton"
import CardActions from '@material-ui/core/CardActions'
import FilterListIcon from '@material-ui/icons/FilterList'
import { changeIsHideFlagAction, deleteCheckedTasksAction } from '../redux/actions/task_action'

const styles = {
  root: {
    display: "flex",
    flexDirection: "column",
    padding: 20,
    paddingTop: 10,
    minHeight: 520,
    maxHeight: 520,
    borderRadius: 6,
    margin: "auto",
    marginTop: 20,
    maxWidth: 480
  },
  endOfCard: {
    marginLeft: "auto",
    marginTop: "auto",
    position: "absulote"
  },
  fab: {
    marginLeft: "auto",
    marginBottom: "auto"
  }
}

function ListItemCard(props) {
    const dispatch = useDispatch() 
    const [filtered, setFilter] = useState(false)
    const [isFormOpen, setIsFormOpen] = useState(false)

    const changeFormState = useCallback(() => setIsFormOpen(!isFormOpen),[setIsFormOpen,isFormOpen])
    const deleteCheckedTasks = useCallback (() => dispatch(deleteCheckedTasksAction()), [dispatch])
    const filterList = useCallback(() => {
        dispatch(changeIsHideFlagAction())
        setFilter(!filtered)
    }, [dispatch,setFilter,filtered])
    
    return (
        <Card className={props.classes.root} >
            <CardHeader
                action={
                <div>
                    <Tooltip title="Delete All Checked Tasks">
                        <IconButton onClick={deleteCheckedTasks} >
                            <DeleteIcon />
                        </IconButton > 
                    </Tooltip>
                    <Tooltip title="Filter Checked Tasks">
                        <IconButton color={filtered ? "secondary" : 'default'}>
                            <FilterListIcon onClick={filterList} />
                        </IconButton>
                    </Tooltip>
                </div>
                }
                title="Your Tasks For Today:"
            />
            <TasksList /> 
            <div>        
                <CardActions disableSpacing className={props.classes.endOfCard} >
                    <Card style={ isFormOpen ? { width: 400, visibility: "visible"} : { visibility: "hidden"} }>
                        <TaskForm />
                    </Card>
                    <Fab size="medium" color="secondary" onClick={changeFormState} aria-label="add" className={props.classes.fab}>
                        { isFormOpen ? <RemoveIcon /> : <AddIcon /> } 
                    </Fab>  
                </CardActions>
            </div>
        </Card>
    )
}

export default withStyles(styles)(ListItemCard)