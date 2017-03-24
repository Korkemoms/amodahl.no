import React from 'react'

import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import App from './App'
import Home from './Home'
import Chess from './Chess'
import About from './About'
import Login from './Login'
import SignereLogin from './SignereLogin'
import Me from './Me'
import AmodahlNo from './AmodahlNo'
import MatrixMultiplication from './MatrixMultiplication'
import LeveringMontering from './LeveringMontering'

export default class MyRouter extends React.Component {

  render () {
    let store = this.props.store
    const history = syncHistoryWithStore(browserHistory, store)

    return (
      <Router history={history}>
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
