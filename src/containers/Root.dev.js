// @flow
import DevTools from './DevTools'

import React, { Component } from 'react'
import { Provider } from 'react-redux'
import Router from './Router'

/* With developer tools. */
export default class Root extends Component {
  render () {
    const { store } = this.props
    return (
      <Provider store={store}>
        <div>
          <Router store={store} />
          <DevTools />
        </div>
      </Provider>
    )
  }
}
