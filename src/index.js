import React from 'react'
import { render } from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'

import 'bootstrap/dist/css/bootstrap.css'
import 'font-awesome/css/font-awesome.css'

import {login} from './actions/Login'

import App from './containers/App'
import Home from './containers/Home'
import Chess from './containers/Chess'
import About from './containers/About'
import Login from './containers/Login'
import Me from './containers/Me'
import AmodahlNo from './containers/AmodahlNo'

import aboutReducer from './reducers/About'
import chessReducer from './reducers/Chess'
import homeReducer from './reducers/Home'
import loginReducer from './reducers/Login'
import myNavbarReducer from './reducers/MyNavbar'
import meReducer from './reducers/Me'

const reducer = combineReducers({
  about: aboutReducer,
  chess: chessReducer,
  home: homeReducer,
  login: loginReducer,
  myNavbar: myNavbarReducer,
  me: meReducer,
  routing: routerReducer
})

const loggerMiddleware = createLogger()

const store = createStore(
  reducer,
  applyMiddleware(
      thunkMiddleware, // lets us dispatch() functions
      loggerMiddleware // neat middleware that logs actions
    )
)

// init facebook sdk
// and fetch jwToken after
window.fbAsyncInit = function () {
  window.FB.init({
    appId: '772463112910269',
    xfbml: true,
    version: 'v2.8'
  })
  window.FB.AppEvents.logPageView()
  store.dispatch(login(true))
};

(function (d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0]
  if (d.getElementById(id)) { return }
  js = d.createElement(s); js.id = id
  js.src = '//connect.facebook.net/en_US/sdk.js'
  fjs.parentNode.insertBefore(js, fjs)
}(document, 'script', 'facebook-jssdk'))

const history = syncHistoryWithStore(browserHistory, store)

render(
  <Provider store={store}>
    <div>
      <Router history={history}>
        <Route path='/' reducer={reducer} component={App}>
          <IndexRoute component={Home} />
          <Route path='/' component={Home} />
          <Route path='/about' component={About} />
          <Route path='/chess-project' component={Chess} />
          <Route path='/amodahl-no' component={AmodahlNo} />
          <Route path='/login' component={Login} />
          <Route path='/me' component={Me} />
        </Route>
      </Router>

    </div>
  </Provider>,
  document.getElementById('reactRoot')

)
