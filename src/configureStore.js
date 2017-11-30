import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import { createSizeAction, createRemAction, listenResize } from 'redux-windowsize'
import { composeWithDevTools } from 'redux-devtools-extension'
import axios from 'axios'
import axiosMiddleware from 'redux-axios-middleware'
import * as reducer from './reducer'

/* global window */

// Configure and create Redux store.

const axiosClient = axios.create({ // all axios can be used, shown in axios documentation
  responseType: 'json',
})
// Function requires an initialState object.
export default function configureStore(initialState) {
  const store = createStore(
    combineReducers(reducer),
    initialState,
    composeWithDevTools(applyMiddleware(axiosMiddleware(axiosClient), thunk))
  )
  store.dispatch(createSizeAction(window))
  store.dispatch(createRemAction(window))
  listenResize(store, window)
  return store
}
