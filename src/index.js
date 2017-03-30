// @flow
import React from 'react'
import { render } from 'react-dom'

import 'bootstrap/dist/css/bootstrap.css'
import 'font-awesome/css/font-awesome.css'

import {login} from './actions/Login'
import configureStore from './store/configureStore'

// $FlowFixMe
const store = configureStore()
store.dispatch(login()) // attempt to log in using local storage

import Root from './containers/Root'

render(
  // $FlowFixMe
  <Root store={store} />,
  document.getElementById('reactRoot')
)
