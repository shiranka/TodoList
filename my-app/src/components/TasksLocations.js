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
import React, { useState, useEffect, useRef } from 'react'
import { setCoordinateAction } from '../redux/actions/task_action'
import { Tile as TileLayer, Vector as VectoreLayer } from 'ol/layer'

const createNewMap = () => 
  new Map({
    target: 'map',
    layers: [new TileLayer({ source: new OSM() })],
    view: new View({
      center: transform([34.4, 32], 'EPSG:4326', 'EPSG:3857'),
      zoom: 7
    }),
  })


const createOverlay = element =>  
  new Overlay ({
    element,
    autoPan: true,
    autoPanAnimation: {
      duration: 250
    }
  })

const styles = {
  root: {
    height: 320,
    width: 805,
    borderRadius: 6,
    marginLeft: 20,
    marginTop: 10
  },
  popup: {
    position: 'absolute',
    backgroundColor: 'white',
    boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
    padding: 20,
    borderRadius: 6,
    border: '1px solid #cccccc',
    margin: 8
  }
}

const TasksLocations = ({ classes }) => {
  const content = useRef()
  const container = useRef()
  const dispatch = useDispatch()
  const [map, setMap] = useState()
  const isHideTasks = useSelector(state => state.isHideTasksTable)
  const tasksFromdb = useSelector(state => state.tasks)
  const tasks = isHideTasks ? tasksFromdb.filter(task => !task.status) : tasksFromdb
  
  useEffect(() => {
    if (map) {
      map.getLayers().forEach(layer => layer.get('name') === 'markersLayer' && map.removeLayer(layer))
      const markers = tasks.map(task => 
        new Feature({ 
          content: task.content,
          geometry: new Point(transform(task.coordinates, 'EPSG:4326', 'EPSG:3857'))
      }))
      const markersSourceLayer = new VectoreSource({ features: markers })
      const markersLayer = new VectoreLayer({ name: 'markersLayer', source: markersSourceLayer })
      map.addLayer(markersLayer)
    }
  }, [tasks, map])
  
  useEffect(() => {
    const map = createNewMap()
    const overlay = createOverlay(container.current)
    map.addOverlay(overlay)
    map.on('pointermove', e => {
      const feature = map.forEachFeatureAtPixel(e.pixel, (feature, layer) => {return feature})
      if (feature) { 
        const coordinate = e.coordinate
        content.current.innerText = feature.values_.content
        overlay.setPosition(coordinate)
      } else {
        overlay.setPosition(undefined)
      }
    })
    map.on('singleclick', click => dispatch(setCoordinateAction(transform(click.coordinate, 'EPSG:3857', 'EPSG:4326'))))
    setMap(map)
  }, [])

  return (
    <React.Fragment>
      <div className={classes.root} id='map' />      
      <div ref={container} className={classes.popup}>
        <div ref={content} />
      </div>
    </React.Fragment>
  )
}

export default withStyles(styles)(TasksLocations)