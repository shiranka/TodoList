import 'ol/ol.css'
import Map from 'ol/Map'
import View from 'ol/View'
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import { transform } from 'ol/proj'
import React, { useState, useMemo, memo, useEffect } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { useSelector, useDispatch } from 'react-redux'
import { OSM, Vector as VectoreSource } from 'ol/source'
import { setCoordinateAction } from '../redux/actions/task_action'
import { Tile as TileLayer, Vector as VectoreLayer } from 'ol/layer'

const createNewMap = () => {
  return new Map({
    target: 'map',
    layers: [new TileLayer({ source: new OSM() })],
    view: new View({
      center: transform([34.4, 32], 'EPSG:4326', 'EPSG:3857'),
      zoom: 7
    }),
  })
}

const styles = {
  root: {
    height: 320,
    width: 805,
    borderRadius: 6,
    marginLeft: 20,
    marginTop: 10
  }
}

const TasksLocations = ({ classes }) => {
  const dispatch = useDispatch()
  const [map, setMap] = useState()
  const tasks = useSelector(state => state.tasks)
  const isHideTasks = useSelector((state) => state.isHideTasksTable)

  useEffect(() => {
    if (map) {
      map.getLayers().forEach(layer => { if(layer.get('name') === 'markersLayer') { map.removeLayer(layer) }})
      const tasksToShow = isHideTasks ? tasks.filter(t => !t.status) : tasks
      const markers = tasksToShow.map(task => new Feature({ geometry: new Point(transform(task.coordinates, 'EPSG:4326', 'EPSG:3857'))}))
      const markersSourceLayer = new VectoreSource({ features: markers })
      const markersLayer = new VectoreLayer({ name: "markersLayer", source: markersSourceLayer })
      map.addLayer(markersLayer)
    }
  }, [tasks, isHideTasks, map])

  useEffect(() => {
    const myMap = createNewMap()
    myMap.on('singleclick', click => {
      dispatch(setCoordinateAction(transform(click.coordinate, 'EPSG:3857', 'EPSG:4326')))
    })
    setMap(myMap)
  }, [])

  return <div className={classes.root} id="map" />
}

export default memo(withStyles(styles)(TasksLocations))