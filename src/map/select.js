import { filter, flow, get, matches } from 'lodash/fp'
import { createSelector, createStructuredSelector } from 'reselect'
import { merge } from 'cape-lodash'
import { select } from 'cape-select'
import { buildDataUrl } from './utils'

export const getMapState = get('map')

export const getConfig = get('settings')
export const getToken = select(getConfig, 'mapboxApiAccessToken')
export const getData = get('data')
export const getDataFeatures = select(getData, 'features')
export const getDatasetId = get('datasetId')
export const getUsername = get('username')
export const getViewport = get('viewport')

export const urlProps = createStructuredSelector({
  datasetId: getDatasetId,
  token: getToken,
  username: getUsername,
})
export const getDataUrl = flow(urlProps, buildDataUrl)

export const geoIsLineString = matches({ geometry: { type: 'LineString' }, type: 'Feature' })
export const filterGeoLineString = filter(geoIsLineString)
export const getLineStrings = flow(getDataFeatures, filterGeoLineString)

// Used to create views.

export const getDataViewport = createStructuredSelector({
  data: getData,
  legs: getLineStrings,
  viewport: getViewport,
})
export const getInfo = createSelector(getConfig, getDataViewport, merge)

// Assumes reducer added to `map` prop.

export const getMapInfo = flow(getMapState, getInfo)
