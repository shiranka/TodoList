import 'ol/ol.css'
import Map from 'ol/Map'
import View from 'ol/View'
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import { transform } from 'ol/proj'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { OSM, Vector as VectoreSource } from 'ol/source'
import { defaults as defaultControls } from 'ol/control'
import { setCoordinateAction } from '../redux/actions/task_action'
import { Tile as TileLayer, Vector as VectoreLayer } from 'ol/layer'

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
  const markers = taskToShow.map(task => {
    return (
      new Feature({
        geometry: new Point(transform(task.coordinates, 'EPSG:4326', 'EPSG:3857'))
      })
    )
  })
 
  const markersSourceLayer = new VectoreSource({
    features: markers
  })
  const markersLayer = new VectoreLayer({
    source: markersSourceLayer
  })

  const basicLayer = new TileLayer({
    source: new OSM()
  })
    
  const map = new Map({
    controls: new defaultControls({ attribution: false }),
    layers: [basicLayer,markersLayer],
    target: 'map',
    view: new View({
      center: transform([34.4,32], 'EPSG:4326', 'EPSG:3857'),
      zoom: 2
    }),
  })
  map.on('singleclick', click => {
    dispatch(setCoordinateAction(transform(click.coordinate, 'EPSG:3857' , 'EPSG:4326')))
  })

  return (
    <div className={classes.root} id="map">
      {/* {map} */}
    </div>
  )
}

export default withStyles(styles)(TasksLocations)