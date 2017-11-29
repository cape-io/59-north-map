import React from 'react'
import PropTypes from 'prop-types'
import ReactMapGL from 'react-map-gl'
import DeckGL, { GeoJsonLayer } from 'deck.gl'

function App(props) {
  const {
    data, handleViewportChange, viewport, mapStyle, mapboxApiAccessToken,
  } = props
  const layer = new GeoJsonLayer({
    id: 'geojson-layer',
    data,
    filled: true,
    stroked: false,
    extruded: true,
    lineWidthScale: 4,
    opacity: 0.5,
    lineWidth: 2,
    lineColor: [255, 0, 0],
    lineWidthMinPixels: 2,
    wireframe: true,
    getLineColor: () => [255, 0, 0],
    getFillColor: () => [255, 0, 0, 0],
    pickable: true,
  })
  return (
    <div className="App">
      <ReactMapGL
        {...viewport}
        mapStyle={mapStyle}
        mapboxApiAccessToken={mapboxApiAccessToken}
        onViewportChange={handleViewportChange}
      >
        <DeckGL {...viewport} layers={[layer]} />
      </ReactMapGL>
    </div>
  )
}
App.propTypes = {
  data: PropTypes.object.isRequired,
  handleViewportChange: PropTypes.func.isRequired,
  viewport: PropTypes.shape({
    height: PropTypes.number.isRequired,
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    zoom: PropTypes.number.isRequired,
  }),
  mapboxApiAccessToken: PropTypes.string.isRequired,
  mapStyle: PropTypes.string.isRequired,
}
export default App
