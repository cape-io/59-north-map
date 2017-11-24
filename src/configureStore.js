import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import { createSizeAction, createRemAction, listenResize } from 'redux-windowsize'
import { composeWithDevTools } from 'redux-devtools-extension'
import * as reducer from './reducer'

/* global window */

// Configure and create Redux store.
// Function requires an initialState object.
export default function configureStore(initialState) {
  const store = createStore(
    combineReducers(reducer),
    initialState,
    composeWithDevTools(applyMiddleware(thunk))
  )
  store.dispatch(createSizeAction(window))
  store.dispatch(createRemAction(window))
  listenResize(store, window)
  return store
}
