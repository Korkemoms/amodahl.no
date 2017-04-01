// @flow
import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import chessReducer from './Chess'
import homeReducer from './Home'
import loginReducer from './Login'
import signereLoginReducer from './SignereLogin'
import myNavbarReducer from './MyNavbar'
import meReducer from './Me'

module.exports = combineReducers({
  chess: chessReducer,
  home: homeReducer,
  login: loginReducer,
  signereLogin: signereLoginReducer,
  myNavbar: myNavbarReducer,
  me: meReducer,
  routing: routerReducer
})
