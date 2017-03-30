// @flow
import { types } from '../constants/ActionTypes'

class State {
  token: ?string
  user: ?Object
  message: ?string
}

const initialState = new State()
initialState.token = null
initialState.user = null
initialState.message = null

 const update = (state: State = initialState, action: Object) => {
  switch (action.type) {
    case types.login.RECEIVE_AMODAHL_TOKEN():
      return Object.assign({}, state, {
        token: action.token,
        user: action.user,
        message: null
      })
    case types.login.REQUEST_AMODAHL_TOKEN_FAILED():
      return Object.assign({}, state, {
        token: null,
        user: null,
        message: null
      })
    case types.login.USER_LOGGED_OUT():
      return Object.assign({}, state, {
        token: null,
        user: null,
        message: null
      })
    default:
      return state
  }
}

export default update
