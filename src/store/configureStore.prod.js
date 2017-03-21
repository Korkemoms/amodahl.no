import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../reducers'

import { browserHistory } from 'react-router'
import { routerMiddleware } from 'react-router-redux'
import thunkMiddleware from 'redux-thunk'

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
  myMiddleware // scroll up when vising new page
)

const enhancer = middleware

export default function configureStore (initialState) {
  return createStore(rootReducer, initialState, enhancer)
};