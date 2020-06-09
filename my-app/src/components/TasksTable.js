import moment from 'moment'
import Paper from '@material-ui/core/Paper'
import Toolbar from '@material-ui/core/Toolbar'
import Tooltip from '@material-ui/core/Tooltip' 
import React, { useMemo, useState } from 'react'
import { withStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import { useDispatch, useSelector } from 'react-redux'
import FilterListIcon from '@material-ui/icons/FilterList'
import { changeIsHideTableFlagAction } from '../redux/actions/task_action'
import { SortingState, IntegratedSorting } from '@devexpress/dx-react-grid'
import { Grid, VirtualTable, TableHeaderRow } from '@devexpress/dx-react-grid-material-ui' 

const styles = {
    root: {
        height: 280,
        width: 765,
        borderRadius: 6,
        marginLeft: 20,
        marginTop: 20,
        paddingRight: 20,
        paddingLeft: 20,
    }, 
    filterIcon: {
        padding: 0,
        paddingTop: 20
    }
}

const TasksTable = ({ classes }) => {
    const dispatch = useDispatch() 
    const isHideTasks = useSelector(state => state.isHideTasksTable)
    const tasksFromdb = useSelector(state => state.tasks)
    const tasks = isHideTasks ? tasksFromdb.filter(task => !task.status) : tasksFromdb
    const [ filtered, setFilter ] = useState(false)

    const filterTable = useMemo(() => () => {
        dispatch(changeIsHideTableFlagAction())
        setFilter(!filtered)
    }, [])
    
    const columns = [
        { name: 'content', title: 'Task' },
        { name: 'date', title: 'Date'},
        { name: 'coordinates', title: 'Coordinates' },
        { name: 'status', title: 'Is Done?' }
    ] 

    const rows = tasks.map(task => {
        return ({
            id: task._id, 
            content: task.content,
            status: task.status ? 'True': 'False',
            date: moment(task.date).format('MMM Do YY'),
            coordinates: `[${parseFloat(task.coordinates[0]).toFixed(3)},${parseFloat(task.coordinates[1]).toFixed(3)}]`
        })
    })
        
    const coordinateWeights = (coordinatesString) => {
        const coordinates = coordinatesString.toString().substr(1)
        const values = coordinates.toString().split(',')
        return values[0]
    }
    
    const compareCoordinates = (a, b) => {
        const coordinateA = Number(coordinateWeights(a))
        const coordinateB = Number(coordinateWeights(b))
        if (coordinateA === coordinateB ) return 0
        return (coordinateA < coordinateB) ? -1 : 1
    }

    const [ sortColumnPlugin ] = useState([
        {columnName: 'coordinates', compare: compareCoordinates}
    ])
    
    return (       
        <Paper className={classes.root}>
            <Grid rows={rows} columns={columns} >
                <SortingState />
                <IntegratedSorting columnExtensions={sortColumnPlugin}/>
                <VirtualTable height='200px'/>
                <TableHeaderRow showSortingControls/>  
                <Toolbar >
                    <Tooltip title='Hide The Tasks You Are Done With'> 
                        <IconButton className={classes.filterIcon} color={filtered ? 'secondary' : 'default'}>
                            <FilterListIcon onClick={filterTable} /> 
                        </IconButton>
                    </Tooltip>  
                </Toolbar>       
            </Grid>
        </Paper>   
    )
}

export default withStyles(styles)(TasksTable)