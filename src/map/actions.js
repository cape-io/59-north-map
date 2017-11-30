import { flow } from 'lodash'
import { createSimpleAction } from 'cape-redux'
import { createObj } from 'cape-lodash'
import { getDataUrl } from './select'

export const VIEWPORT_CHANGE = 'map/VIEWPORT_CHANGE'
export const handleViewportChange = createSimpleAction(VIEWPORT_CHANGE)

export const GET_DATA = 'map/GET_DATA'
export const GOT_DATA = 'map/GET_DATA_SUCCESS'
export const getDataPayload = flow(createObj('url'), createObj('request'))
export const fetchData = createSimpleAction(GET_DATA, getDataPayload)
export const getFetchDataAction = flow(getDataUrl, fetchData)
