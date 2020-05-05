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
import { makeStyles } from "@material-ui/core/styles"
import CardHeader from "@material-ui/core/CardHeader"
import IconButton from "@material-ui/core/IconButton"
import CardActions from '@material-ui/core/CardActions'
import FilterListIcon from '@material-ui/icons/FilterList'
import { changeIsHideFlagAction, deleteCheckedTasksAction } from '../redux/actions/task_action'

const useStyles = makeStyles({
  root: {
    display:"flex",
    flexDirection:"column",
    padding:20,
    paddingTop:10,
    minHeight:520,
    maxHeight:520,
    borderRadius: 6,
    margin: "auto",
    marginTop: 20,
    maxWidth: 480
  }
})

export default function ListItemCard() {
    const classes = useStyles()
    const dispatch = useDispatch() 
    const [filtered, setFilter] = useState(false)
    const [isFormOpen, setIsFormOpen] = useState(false)

    const deleteCheckedTasks = useCallback (() => dispatch(deleteCheckedTasksAction()), [dispatch])
    const filterList = useCallback(() => {
        dispatch(changeIsHideFlagAction())
        setFilter(!filtered)
    }, [dispatch,setFilter,filtered])
    const changeFormState = useCallback(() => setIsFormOpen(!isFormOpen),[setIsFormOpen,isFormOpen])
    return (
        <Card className={classes.root} >
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
            <CardActions disableSpacing style={{marginLeft:"auto",marginTop:"auto",position:"absulote"}} >
                <Card style={ isFormOpen ? { width: 400, visibility: "visible"} : { visibility: "hidden"} }>
                    <TaskForm />
                </Card>
                <Fab size="medium" color="secondary" onClick={changeFormState} aria-label="add" style={{marginLeft:"auto",marginBottom:"auto"}}>
                    { isFormOpen ? <RemoveIcon /> : <AddIcon /> } 
                </Fab>  
            </CardActions>
        </Card>
    )
}