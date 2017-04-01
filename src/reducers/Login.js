// @flow
import type { Action } from '../actions/Types'
import { ActionTypes } from '../actions/Types'

export type State = {
  message: ?string,
  loading: boolean,
  cancelled: boolean,
  displayMessage: boolean,
  user: ?Object,
  history: Array<string>
}

const initialState = {
  message: null,
  loading: false,
  cancelled: false,
  displayMessage: false,
  user: null,
  history: []
}

export default function update (state: State = initialState, action: Action) {
  switch (action.type) {
    case '@@router/LOCATION_CHANGE': {
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
    case ActionTypes.UPDATE_LOGIN_INFO:
      return Object.assign({}, state, {
        message: action.payload.message,
        displayMessage: action.payload.displayMessage,
        loading: action.payload.loading,
        cancelled: action.payload.cancelled
      })
    case ActionTypes.FETCH_AMODAHL_TOKEN: {
      return Object.assign({}, state, {
        user: action.error ? null : action.payload.user
      })
    }

    case ActionTypes.USER_LOGGED_OUT:
      return Object.assign({}, state, {
        user: null,
        message: 'You logged out.',
        displayMessage: true
      })
    default:
      return state
  }
}
