// @flow
import { types } from '../constants/ActionTypes'

class State {
  message: ?string
  loading: boolean
  cancelled: boolean
  displayMessage: boolean
  user: ?Object
  history: Array<string>
}

const initialState = new State()
initialState.message = null
initialState.loading = false
initialState.cancelled = false
initialState.displayMessage = false
initialState.user = null
initialState.history = []


export default function update (state: State = initialState, action: Object) {
  switch (action.type) {
    case types.router.LOCATION_CHANGE(): {
      let history = state.history.slice(0, 10)
      history.push(action.payload.pathname)

      let additional = {}
      // if navigate away from login page while loading then cancel login procedure
      if (state.loading && action.payload.pathname !== '/login') {
        additional = {
          loading: false,
          cancelled: true,
          displayMessage: true,
          message: 'Login cancelled by user'
        }
      }

      return Object.assign({}, state, {
        history: history,
        ...additional
      })
    }
    case types.login.UPDATE_LOGIN_INFO():
      return Object.assign({}, state, {
        message: action.message,
        displayMessage: action.displayMessage,
        loading: action.loading,
        cancelled: action.cancelled
      })
    case types.login.RECEIVE_AMODAHL_TOKEN():
      return Object.assign({}, state, {
        user: action.user
      })
    case types.login.USER_LOGGED_OUT():
      return Object.assign({}, state, {
        user: null,
        message: 'You logged out.',
        displayMessage: true
      })
    default:
      return state
  }
}
