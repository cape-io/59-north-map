import React from 'react'
import PropTypes from 'prop-types'
import { map } from 'lodash'

function LegList({ legs }) {
  return (
    <ul>
      { map(legs, ({ id, properties: { title, title2 } }) => (
        <li key={id}>{title2} - {title}</li>
      ))}
    </ul>
  )
}
LegList.propTypes = {
  legs: PropTypes.array.isRequired,
}
export default LegList
