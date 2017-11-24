import { createSimpleAction } from 'cape-redux'

export const VIEWPORT_CHANGE = 'map/VIEWPORT_CHANGE'
export const handleViewportChange = createSimpleAction(VIEWPORT_CHANGE)
