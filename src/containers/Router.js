// @flow
import React from 'react'

import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import App from '../components/App'
import Home from './Home'
import Chess from './Chess'
import About from '../components/About'
import Login from './Login'
import SignereLogin from './SignereLogin'
import Me from './Me'
import AmodahlNo from '../components/AmodahlNo'
import MatrixMultiplication from '../components/MatrixMultiplication'
import LeveringMontering from './LeveringMontering'

/** scroll to the anchor */
function hashLinkScroll (newPage) {
  const { hash } = window.location
  if (hash !== '') {
    const f = () => {
      const id = hash.replace('#', '')
      const element = document.getElementById(id)
      if (element) element.scrollIntoView()
    }
    if (newPage) {
      // Push onto callback queue so it runs after the DOM is updated,
      // this is required when navigating from a different page so that
      // the element is rendered on the page before trying to getElementById.
      setTimeout(() => {
        f()
      }, 0)
    } else {
      f()
    }
  }
}

/* Keeps url in sync with application */
export default class MyRouter extends React.Component {
  render () {
    let store = this.props.store
    const history = syncHistoryWithStore(browserHistory, store)

    return (
      <Router history={history}
        onUpdate={hashLinkScroll}>
        <Route path='/' component={App}>
          <IndexRoute component={Home} />
          <Route path='/' component={Home} />
          <Route path='/about' component={About} />
          <Route path='/chess-project' component={Chess} />
          <Route path='/amodahl-no' component={AmodahlNo} />
          <Route path='/matrix-multiplication' component={MatrixMultiplication} />
          <Route path='/leveringmontering' component={LeveringMontering} />
          <Route path='/login' component={Login} />
          <Route path='/signere-login' component={SignereLogin} />
          <Route path='/me' component={Me} />
        </Route>
      </Router>
    )
  }
}
