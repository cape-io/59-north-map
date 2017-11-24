import { createReducer } from 'cape-redux'
import { setKey } from 'cape-lodash'
import { VIEWPORT_CHANGE } from './actions'

const defaultState = {
  viewport: {
    width: 600,
    height: 400,
    zoom: 9,
  },
  settings: {},
}

const changeViewport = setKey('viewport')
export const reducers = {
  [VIEWPORT_CHANGE]: changeViewport,
}
export default createReducer(reducers, defaultState)
