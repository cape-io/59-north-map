import { connect } from 'react-redux'
import Component from './AppEl'
import { getMapInfo } from './map/select'
import { handleViewportChange } from './map/actions'

const getState = getMapInfo
const actions = {
  handleViewportChange,
}
export default connect(getState, actions)(Component)
