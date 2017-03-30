// @flow
import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../reducers'

import { browserHistory } from 'react-router'
import { routerMiddleware } from 'react-router-redux'
import thunkMiddleware from 'redux-thunk'

// useful in production (atleast in this stage of development)
import createLogger from 'redux-logger'

const myMiddleware = store => next => action => {
  if (action.type === '@@router/LOCATION_CHANGE') {
    // scroll up when vising new page
    window.scrollTo(0, 0)
  }
  return next(action)
}

const middleware = applyMiddleware(
  thunkMiddleware, // allows dispatching of functions
  routerMiddleware(browserHistory), // keeps url in sync with app
  myMiddleware, // scroll up when vising new page
  createLogger() // useful logging
)

const enhancer = middleware

const configureStore = (initialState: Object) => {
  return createStore(rootReducer, initialState, enhancer)
}

export default configureStore
