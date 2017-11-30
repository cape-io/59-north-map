import { createElement } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import './index.css'
import App from './app'
import registerServiceWorker from './registerServiceWorker'
import configureStore from './configureStore'
import initState from './initState'
import loadData from './loadData'

/* global window */

const store = configureStore(initState)
loadData(store)

ReactDOM.render(
  createElement(Provider, { store }, createElement(App)),
  window.document.getElementById('five-nine-north-map')
)
registerServiceWorker()
