function getBounds(data) {
  let wLon = null
  let sLat = null
  let nLat = null
  let eLon = null
  const updateCoords = ([lon, lat]) => {
    if (wLon === null || lon <= wLon) wLon = lon
    if (sLat === null || lat <= sLat) sLat = lat
    if (eLon === null || lon >= eLon) eLon = lon
    if (nLat === null || lat >= nLat) nLat = lat
  }
  data.features.map((feature) => {
    if (feature.geometry.type === 'Point') {
      updateCoords(feature.geometry.coordinates)
    } else if (feature.geometry.type === 'LineString') {
      feature.geometry.coordinates.map(updateCoords)
    }
  })
  const cLon = (eLon - wLon) / (2 + wLon)
  const cLat = (nLat - sLat) / (2 + sLat)

  return {
    bounds: [wLon, sLat, eLon, nLat],
    centroid: [cLon, cLat],
  }
}

const FiveNineNorthMap = function (mbx, options) {
  this.makeMap = function (data) {
    mbx.accessToken = options.token
    const bounds = getBounds(data)
    const init = {
      container: options.container,
      style: options.style,
      center: options.centroid || bounds.centroid,
    }
    if (typeof options.zoom !== 'undefined' && options.zoom !== null) {
      init.zoom = options.zoom
    }
    this.map = new mbx.Map(init)
    const map = this.map
    map.addControl(new mbx.FullscreenControl())
    this.map.on('load', () => {
      addLines(map, data)
      addPoints(map, data)
      if (typeof init.zoom === 'undefined') {
        map.fitBounds(bounds.bounds, { padding: options.padding || 20 })
      }
    })
    this.map.on('click', (e) => {
      const points = map.queryRenderedFeatures(e.point, {
        layers: [pointLayerName('primary-port'),
          pointLayerName('secondary-port'),
          pointLayerName('route')],
      })
      if (points.length) {
        addPopup(map, points[0])
      }
      const lines = map.queryRenderedFeatures(e.point, {
        layers: ['fnnLineLayer', 'fnnLineLabelLayer'],
      })
      if (lines.length) {
        if (lines[0].properties.link) {
          const newWin = window.open(lines[0].properties.link, '_blank')
          newWin.focus()
        }
      }
    })
    addCursorEvents(map, pointLayerName('primary-port'))
    addCursorEvents(map, pointLayerName('secondary-port'))
    addCursorEvents(map, pointLayerName('route'))
    addCursorEvents(map, 'fnnLineLayer')
    addCursorEvents(map, 'fnnLineLabelLayer')
  }.bind(this)

  const italicFont = ['DIN Offc Pro Cond Medium Italic', 'Arial Unicode MS Regular']
  const regularFont = ['DIN Offc Pro Cond Medium', 'Arial Unicode MS Regular']

  var addCursorEvents = function (map, layerName) {
    map.on('mouseenter', layerName, (e) => {
      map.getCanvas().style.cursor = 'pointer'
    })
    map.on('mouseleave', layerName, (e) => {
      map.getCanvas().style.cursor = ''
    })
  }

  var addPopup = function (map, point) {
    let html = `<div style="max-width: 400px"><h3>${point.properties.title}</h3>`
    if (point.properties.description) {
      html += `<p>${point.properties.description}</p>`
    }
    const links = []
    for (const prop in point.properties) {
      if (point.properties.hasOwnProperty(prop)
           && prop !== 'title' && prop !== 'description' && prop !== 'type') {
        links.push([prop, point.properties[prop]])
      }
    }
    if (links.length) {
      html += '<ul>'
      links.map((l) => {
        html += `<li><h3 style="color: #006891"><a href="${l[1]}" target="_blank">${l[0]}</a></h3></li>`
      })
      html += '</ul>'
    }
    html += '</div>'
    const popup = new mbx.Popup({ offset: [0, -15] })
      .setLngLat(point.geometry.coordinates)
      .setHTML(html)
      .setLngLat(point.geometry.coordinates)
      .addTo(map)
  }

  var pointLayerName = function (name) {
    return `fnnPointsLayer${name}`
  }

  const pointSourceName = function (name) {
    return `fnnPoints${name}`
  }

  const addPointLayer = function (map, data, name, layoutOptions) {
    const points = data.features.filter(x => (x.geometry.type === 'Point' && x.properties.type === name))

    const sourceName = pointSourceName(name)
    const layerName = pointLayerName(name)
    const layout = {
      'text-field': '{title}',
      'text-size': {
        base: 1,
        stops: [
          [1, 8], [3, 9], [6, 14], [14, 22],
        ],
      },
      'text-padding': 1,
      visibility: 'visible',
      'text-offset': [-1, 0.1],
      'text-rotation-alignment': 'viewport',
      'text-anchor': 'right',
      'text-rotate': 0,
      'text-letter-spacing': 0.2,
      'icon-padding': 1,
      'text-max-width': 10,
    }

    for (const opt in layoutOptions) {
      if (layoutOptions.hasOwnProperty(opt)) {
        layout[opt] = layoutOptions[opt]
      }
    }
    map.addSource(sourceName, {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: points,
      },
    })
    map.addLayer({
      id: layerName,
      type: 'symbol',
      source: sourceName,
      layout,
      paint: {
        'text-color': '#ffffff',
        'text-halo-color': 'hsl(206, 50%, 40%)',
        'text-halo-width': 1,
      },
    })
  }

  var addPoints = function (map, data) {
    addPointLayer(map, data, 'primary-port', { 'text-font': regularFont, 'text-transform': 'uppercase', 'icon-image': 'port-8' })
    addPointLayer(map, data, 'secondary-port', { 'text-font': regularFont, 'icon-image': 'port-8' })
    addPointLayer(map, data, 'route', { 'text-font': italicFont })
  }

  var addLines = function (map, data) {
    const lines = data.features.filter(x => x.geometry.type === 'LineString')
    map.addSource('fnnLines', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: lines,
      },
    })
    map.addLayer({
      id: 'fnnLineLayer',
      type: 'line',
      source: 'fnnLines',
      layout: {
        'line-join': 'round',
        'line-cap': 'round',
      },
      paint: {
        'line-color': '#fad117',
        'line-width': 2,
      },
    })
    map.addLayer({
      id: 'fnnLineLabelLayer',
      type: 'symbol',
      source: 'fnnLines',
      layout: {
        'text-field': '{title}',
        'symbol-placement': 'line',
        'text-max-angle': 25,
        visibility: 'visible',
        'text-anchor': 'bottom-left',
        'text-padding': 5,
        'text-font': italicFont,
        'text-letter-spacing': 0.2,
        'text-size': {
          base: 1,
          stops: [
            [1, 8], [3, 9], [6, 14], [14, 22],
          ],
        },
      },
      paint: {
        'text-color': '#ffffff',
        'text-halo-color': 'hsl(206, 50%, 40%)',
        'text-halo-width': 1,
      },
    })
  }
}
