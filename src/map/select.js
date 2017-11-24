import { flow, get } from 'lodash/fp'
import { createSelector } from 'reselect'
import { merge } from 'cape-lodash'

export const getMapState = get('map')

export const getConfig = get('settings')
export const getViewport = get('viewport')

export const getInfo = createSelector(getConfig, getViewport, merge)

export const getMapInfo = flow(getMapState, getInfo)
