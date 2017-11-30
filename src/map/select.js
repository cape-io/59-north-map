import { flow, get } from 'lodash/fp'
import { createSelector, createStructuredSelector } from 'reselect'
import { merge } from 'cape-lodash'
import { select } from 'cape-select'
import { buildDataUrl } from './utils'

export const getMapState = get('map')

export const getConfig = get('settings')
export const getToken = select(getConfig, 'mapboxApiAccessToken')
export const getData = get('data')
export const getDatasetId = get('datasetId')
export const getUsername = get('username')
export const getViewport = get('viewport')

export const getDataViewport = createStructuredSelector({
  data: getData,
  viewport: getViewport,
})
export const getInfo = createSelector(getConfig, getDataViewport, merge)
export const getMapInfo = flow(getMapState, getInfo)

export const urlProps = createStructuredSelector({
  datasetId: getDatasetId,
  token: getToken,
  username: getUsername,
})
export const getDataUrl = flow(urlProps, buildDataUrl)
