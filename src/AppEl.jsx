import React from 'react'
import PropTypes from 'prop-types'
import ReactMapGL from 'react-map-gl'
import './App.css'

function App(props) {
  const {
    handleViewportChange, height, latitude, longitude, mapStyle, mapboxApiAccessToken, width, zoom,
  } = props
  return (
    <div className="App">
      <ReactMapGL
        height={height}
        width={width}
        mapStyle={mapStyle}
        mapboxApiAccessToken={mapboxApiAccessToken}
        latitude={latitude}
        longitude={longitude}
        zoom={zoom}
        onViewportChange={handleViewportChange}
      />
    </div>
  )
}
App.propTypes = {
  handleViewportChange: PropTypes.func.isRequired,
  height: PropTypes.number.isRequired,
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
  mapStyle: PropTypes.string.isRequired,
  mapboxApiAccessToken: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  zoom: PropTypes.number.isRequired,
}
export default App
