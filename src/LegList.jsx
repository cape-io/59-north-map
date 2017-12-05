import React from 'react'
import PropTypes from 'prop-types'
import { map } from 'lodash'

function LegList({ legs }) {
  return (
    <ul>
      { map(legs, ({ id, properties: { title, legId } }) => (
        <li key={id}>{legId} - {title}</li>
      ))}
    </ul>
  )
}
LegList.propTypes = {
  legs: PropTypes.array.isRequired,
}
export default LegList
