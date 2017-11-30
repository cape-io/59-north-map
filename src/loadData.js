import { flow, method } from 'lodash'
import { getMapState, getFetchDataAction } from './map'

export const fetchDataAction = flow(
  method('getState'),
  getMapState,
  getFetchDataAction,
)

export default function loadData(store) {
  store.dispatch(fetchDataAction(store))
    .then(console.log)
}
