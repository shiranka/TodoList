import React from 'react'
import moment from "moment"
import { useSelector } from 'react-redux'
import Paper from '@material-ui/core/Paper' 
import { withStyles } from '@material-ui/core/styles'
import { Grid, Table, TableHeaderRow } from '@devexpress/dx-react-grid-material-ui' 

const styles = {
    root: {
        overflow: "auto",
        minHeight: 320, 
        maxHeight: 320,
        width: 765,
        padding: 20,
        paddingTop: 10,      
        borderRadius: 6,
        marginLeft: 20,
        marginTop: 20
    }
}

const TasksTable = (props) => {
    const tasks = useSelector((state) => state.tasks)
    const isHideTasks = useSelector((state) => state.isHideTasks)
    
    const columns = [
        { name: 'content', title: "Task" },
        { name: 'date', title: 'Date'},
        { name: 'coordinates', title: 'Coordinates' },
        { name: 'status', title: 'Done/Not Done' }
    ] 
    const rows = tasks.map(t => {
        return ({id: t._id, content: t.content, status: t.status ? "Done": "Not Done", date: moment(t.date).format("MMM Do YY"), coordinates: `[${t.x},${t.y}]`})
    })
    
    return (       
        <Paper className={props.classes.root}>
            <Grid rows={rows} columns={columns} >
                <Table />
                <TableHeaderRow />
            </Grid>
        </Paper>   
    )
}

export default withStyles(styles)(TasksTable)
