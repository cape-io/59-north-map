import { defaultTo } from 'lodash/fp'

export const config = defaultTo({})
export { default as map } from './map/reducer'
export { default as windowSize } from 'redux-windowsize'
