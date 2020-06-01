import 'ol/ol.css'
import Map from 'ol/Map'
import View from 'ol/View'
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import { transform } from 'ol/proj'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles'
import { OSM, Vector as VectoreSource } from 'ol/source'
import { defaults as defaultControls } from 'ol/control'
import { Tile as TileLayer, Vector as VectoreLayer }from 'ol/layer'

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
  const tasks = useSelector((state) => state.tasks)
  const isHideTasks = useSelector((state) => state.isHideTasksTable)

  const taskToShow = isHideTasks ? tasks.filter( t => !t.status) : tasks
  const tasksCoordinate = taskToShow.map(task => task.coordinates)

  const marker = new Feature({
    geometry: new Point(transform([34.4,32], 'EPSG:4326', 'EPSG:3857'))
  })
  
  const markersSourceLayer = new VectoreSource({
    features: [marker]
  })
  const markersLayer = new VectoreLayer({
    source: markersSourceLayer
  })

  const basicLayer = new TileLayer({
    source: new OSM()
  })
  useEffect(() => {
    new Map({
      controls: new defaultControls({ attribution: false }),
      layers: [basicLayer,markersLayer],
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