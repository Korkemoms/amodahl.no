import React from 'react'
import { render } from 'react-dom'

import 'bootstrap/dist/css/bootstrap.css'
import 'font-awesome/css/font-awesome.css'

import {login} from './actions/Login'
import configureStore from './store/configureStore'

const store = configureStore()
store.dispatch(login())

import Root from './containers/Root'

render(
  <Root store={store} />,
  document.getElementById('reactRoot')
)
