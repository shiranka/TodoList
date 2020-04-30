import TaskForm from './TaskForm'
import { useDispatch } from 'react-redux'
import React, { useCallback } from 'react'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import MenuIcon from '@material-ui/icons/Menu'
import Toolbar from '@material-ui/core/Toolbar'
import Divider from '@material-ui/core/Divider'
import Checkbox from '@material-ui/core/Checkbox'
import DeleteIcon from '@material-ui/icons/Delete'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { changeIsHideFlagAction, deleteCheckedTasksAction } from '../redux/actions/task_action'

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  root: {
    display: 'flex',
  },
  menuButton: {
    marginRight: 20,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },  
}))

export default function PersistentDrawerLeft() {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const dispatch = useDispatch()      
  const deleteCheckedTasks = useCallback (() => dispatch(deleteCheckedTasksAction()), [dispatch])
  const isHideFlag = useCallback(() =>  dispatch(changeIsHideFlagAction()), [dispatch])
      
  const clickDrawer = () => {
    setOpen(!open)
  }
 
  const navBar = ( <div>
                  <AppBar position="fixed">
                    <Toolbar  >
                      <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={clickDrawer}
                        edge="start"
                        className={classes.menuButton}>
                        <MenuIcon />
                      </IconButton>
                      <Typography variant="h6" style={{margin: 'auto'}}>
                        Your tasks for today:
                      </Typography>
                    </Toolbar>  
                  </AppBar>
                  <Toolbar />
                  <Drawer
                    variant="persistent"
                    anchor="left"
                    open={open}
                    style={{width: drawerWidth}}>
                    <div className={classes.drawerHeader}>
                      <IconButton onClick={clickDrawer}>
                        <ChevronLeftIcon /> 
                      </IconButton>
                    </div>
                    <Divider />                    
                    <FormControlLabel                        
                      control={                
                          <Checkbox
                              value="hide task"                                 
                              onChange={isHideFlag}
                              color="wight"
                          />}
                      label="Hide Checked Tasks" /> 
                    <FormControlLabel                        
                      control={<IconButton onClick={deleteCheckedTasks} >
                        <DeleteIcon />
                      </IconButton >      }          
                    label="Delete Checked Tasks" />                      
                    <Divider />        
                    <TaskForm />        
                  </Drawer>
                  
                  </div>) 
  return (
    <div className={classes.root}>
      { navBar }
    </div>
  )
}
