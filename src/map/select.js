import { flow, get } from 'lodash/fp'
import { createSelector, createStructuredSelector } from 'reselect'
import { merge } from 'cape-lodash'

export const getMapState = get('map')

export const getConfig = get('settings')
export const getData = get('data.features[2]')
export const getViewport = get('viewport')

export const getDataViewport = createStructuredSelector({
  data: getData,
  viewport: getViewport,
})
export const getInfo = createSelector(getConfig, getDataViewport, merge)
export const getMapInfo = flow(getMapState, getInfo)
