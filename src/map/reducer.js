import { createReducer } from 'cape-redux'
import { setKey } from 'cape-lodash'
import { GOT_DATA, VIEWPORT_CHANGE } from './actions'

const defaultState = {
  data: {},
  viewport: {
    width: 600,
    height: 400,
    zoom: 1,
    latitude: 0,
    longitude: 0,
    bearing: 0,
    isDragging: false,
    startDragLngLat: undefined,
  },
  settings: {},
}

const changeData = (state, { data }) => ({ ...state, data })
const changeViewport = setKey('viewport')
export const reducers = {
  [GOT_DATA]: changeData,
  [VIEWPORT_CHANGE]: changeViewport,
}
export default createReducer(reducers, defaultState)
