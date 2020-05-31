import 'ol/ol.css'
import Paper from '@material-ui/core/Paper'
import React, { useEffect } from 'react'
import { defaults as defaultControls } from 'ol/control'
import {transform} from 'ol/proj'
import { withStyles } from '@material-ui/core/styles'
import { useDispatch, useSelector } from 'react-redux'
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

const styles = {
  root: {
    height: 300,
    width: 805,
    borderRadius: 6,
    marginLeft: 20,
    marginTop: 10
  }
}

const TasksLocations = ({ classes }) => {
  const dispatch = useDispatch() 
  const tasks = useSelector((state) => state.tasks)
  const isHideTasks = useSelector((state) => state.isHideTasksTable)

  const taskToShow = isHideTasks ? tasks.filter( t => !t.status) : tasks
  const tasksCoordinate = taskToShow.map(task => task.coordinates)

  useEffect(() => {
    new Map({
      controls: new defaultControls({ attribution: false }),
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      target: 'map',
      view: new View({
        center: transform([34.4,32], 'EPSG:4326', 'EPSG:3857'),
        zoom: 7
      }), 

    })}, [])

  return (
    // <div></div>
    <Paper  className={classes.root} id="map">
    </Paper> 
  )
}

export default withStyles(styles)(TasksLocations)