import 'ol/ol.css'
import Map from 'ol/Map'
import View from 'ol/View'
import Overlay from 'ol/Overlay'
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import { transform } from 'ol/proj'
import { withStyles } from '@material-ui/core/styles'
import { useSelector, useDispatch } from 'react-redux'
import { OSM, Vector as VectoreSource } from 'ol/source'
import React, { useState, useEffect } from 'react'
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
  },
  popup: {
    position: "absolute",
    backgroundColor: "white",
    boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
    padding: 20,
    borderRadius: 6,
    border: "1px solid #cccccc",
    margin: 8
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
      const markers = tasksToShow.map(task => 
        new Feature({ 
          content: task.content,
          geometry: new Point(transform(task.coordinates, 'EPSG:4326', 'EPSG:3857'))
      }))
      const markersSourceLayer = new VectoreSource({ features: markers })
      const markersLayer = new VectoreLayer({ name: "markersLayer", source: markersSourceLayer })
      map.addLayer(markersLayer)
    }
  }, [tasks, isHideTasks, map])

  useEffect(() => {
    const myMap = createNewMap()
    const container = document.getElementById('popup')
    const content = document.getElementById('popup-content')
    const overlay = new Overlay ({
      element: container,
      autoPan: true,
      autoPanAnimation: {
        duration: 250
      }
    })
    myMap.addOverlay(overlay)
    myMap.on('pointermove', click => {
      const feature = myMap.forEachFeatureAtPixel(click.pixel, (feature, layer) => {return feature})
      if (feature) { 
        const coordinate = click.coordinate
        content.innerHTML = feature.values_.content
        overlay.setPosition(coordinate)
      } else {
        overlay.setPosition(undefined)
      }
    })
    myMap.on("singleclick", click => {
      dispatch(setCoordinateAction(transform(click.coordinate, 'EPSG:3857', 'EPSG:4326')))
    })
    setMap(myMap)
  }, [])

  return (
    <div>
      <div className={classes.root} id="map" />      
      <div id="popup" className={classes.popup}>
        <div id="popup-content"/>
      </div>
    </div>
  )
}

export default withStyles(styles)(TasksLocations)