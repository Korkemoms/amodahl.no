import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import aboutReducer from './About'
import chessReducer from './Chess'
import homeReducer from './Home'
import loginReducer from './Login'
import signereLoginReducer from './SignereLogin'
import leveringMonteringReducer from './LeveringMontering'
import myNavbarReducer from './MyNavbar'
import meReducer from './Me'

module.exports = combineReducers({
  about: aboutReducer,
  chess: chessReducer,
  home: homeReducer,
  login: loginReducer,
  signereLogin: signereLoginReducer,
  leveringMontering: leveringMonteringReducer,
  myNavbar: myNavbarReducer,
  me: meReducer,
  routing: routerReducer
})
