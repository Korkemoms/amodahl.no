import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from '../reducers'
import DevTools from '../containers/DevTools'

import { browserHistory } from 'react-router'
import { routerMiddleware } from 'react-router-redux'
import thunkMiddleware from 'redux-thunk'
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

const enhancer = compose(
  middleware,
  DevTools.instrument()
)

export default function configureStore (initialState) {
  const store = createStore(rootReducer, initialState, enhancer)

  // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers')/* .default if you use Babel 6+ */)
    )
  }

  return store
}
