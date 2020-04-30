import { useDispatch } from 'react-redux'
import React, { useCallback } from 'react'
import Paper from '@material-ui/core/Paper'
import Checkbox from '@material-ui/core/Checkbox'
import DeleteIcon from "@material-ui/icons/Delete"
import { makeStyles } from '@material-ui/core/styles'
import IconButton from "@material-ui/core/IconButton"
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { deleteTaskAction, changeStatusAction } from '../redux/actions/task_action'

const useStyles = makeStyles({
  root: {
    display: 'flex', 
    alignItems:"center",
    justifyContent: "center",    
    flexWrap: 'wrap',
    width: 400,
    margin:"auto" ,
    marginTop: 10,
    borderRadius: 10,
    padding: 25
  },
})

const Task = ({ task }) => {
    const classes = useStyles()  
    const dispatch = useDispatch()
  
    const changeStatus = useCallback((id) => () => {
        dispatch(changeStatusAction(id))
    }, [dispatch])
    
    const deleteTask = useCallback((id) => () => {
        dispatch(deleteTaskAction(id))
    }, [dispatch])

    const taskVeiw = (
        <div style={{display:"flex" }}>
      <Paper  className={classes.root}><FormControlLabel style={task.status ? ({ textDecoration: 'line-through'}) : {}}                      
                    control={                
                        <Checkbox
                            checked={task.status}
                            onChange={changeStatus(task.id)}
                            color="primary"
                        />      
                    }
                    label={task.content}
                />  
                <IconButton onClick={deleteTask(task.id)} >
                    <DeleteIcon />
                </IconButton ></Paper>
    </div>
        // <List >
        //     <ListItem divider="true" >
        //         <FormControlLabel style={task.status ? ({ textDecoration: 'line-through'}) : {}}                      
        //             control={                
        //                 <Checkbox
        //                     checked={task.status}
        //                     onChange={changeStatus(task.id)}
        //                     color="primary"
        //                 />      
        //             }
        //             label={task.content}
        //         />  
        //         <IconButton onClick={deleteTask(task.id)} >
        //             <DeleteIcon />
        //         </IconButton >
        //     </ListItem>
        // </List> 
    )

    return(
        <div> 
            { taskVeiw }
        </div>
    )
}

export default Task