// @flow
import React from 'react'
import { render } from 'react-dom'
import Root from './containers/Root'

import 'bootstrap/dist/css/bootstrap.css'
import 'font-awesome/css/font-awesome.css'

import {offlineLogin} from './actions/Login'
import configureStore from './store/configureStore'

// $FlowFixMe
const store = configureStore()
window.store = store // make available to native app
store.dispatch(offlineLogin()) // attempt to log in using local storage

render(
  // $FlowFixMe
  <Root store={store} />,
  document.getElementById('reactRoot')
)
