import React, {  useCallback, useState } from 'react'
import moment from "moment"
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import Paper from '@material-ui/core/Paper'
import Toolbar from '@material-ui/core/Toolbar'
import Tooltip from '@material-ui/core/Tooltip' 
import { withStyles } from '@material-ui/core/styles'
import IconButton from "@material-ui/core/IconButton"
import FilterListIcon from '@material-ui/icons/FilterList'
import { changeIsHideTableFlagAction } from '../redux/actions/task_action'
import { SortingState, IntegratedSorting } from '@devexpress/dx-react-grid'
import { Grid, VirtualTable, TableHeaderRow } from '@devexpress/dx-react-grid-material-ui' 

const styles = {
    root: {
        height: 350,
        width: 765,
        borderRadius: 6,
        marginLeft: 20,
        marginTop: 20,
        paddingRight: 20,
        paddingLeft: 20,
    }, filterIcon: {
        paddingTop: 30,
        paddingLeft: 0,
    }
}

const TasksTable = (props) => {
    const dispatch = useDispatch() 
    const tasks = useSelector((state) => state.tasks)
    const isHideTasks = useSelector((state) => state.isHideTasksTable)
    const [filtered, setFilter] = useState(false)
    
    const filterTable = useCallback(() => {
        dispatch(changeIsHideTableFlagAction())
        setFilter(!filtered)
    }, [dispatch,setFilter,filtered])
    
    const columns = [
        { name: 'content', title: "Task" },
        { name: 'date', title: 'Date'},
        { name: 'coordinates', title: 'Coordinates' },
        { name: 'status', title: 'Done/Not Done' }
    ] 
    const rows = tasks.map(task => {
        if (!(isHideTasks && task.status)) {                 
            return ({
                id: task._id, 
                content: task.content,
                status: task.status ? "Done": "Not Done",
                date: moment(task.date).format("MMM Do YY"),
                coordinates: `[${task.x},${task.y}]`
            })
        } else {
            return null
        }
    })
    
    const filterdRows = rows.filter( t => {return t !== null })

    return (       
        <Paper className={props.classes.root}
        >
            <Grid rows={filterdRows} columns={columns} >
                <SortingState />
                <IntegratedSorting />
                <VirtualTable height='250px'/>
                <TableHeaderRow showSortingControls/>  
                <Toolbar >
                    <Tooltip title="Hide The Tasks You Are Done With">
                        <IconButton className={props.classes.filterIcon} color={filtered ? "secondary" : 'default'}>
                            <FilterListIcon onClick={filterTable} /> 
                        </IconButton>
                    </Tooltip>  
                </Toolbar>       
            </Grid>
        </Paper>   
    )
}

export default withStyles(styles)(TasksTable)