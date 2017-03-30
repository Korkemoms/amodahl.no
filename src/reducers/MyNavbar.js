// @flow
import { types } from '../constants/ActionTypes'

class State {
  user: ?Object
  page: ?string
}

const initialState = new State()
initialState.user = null
initialState.page = null

const update = (state: State = initialState, action: Object) => {
  switch (action.type) {
    case types.login.RECEIVE_AMODAHL_TOKEN():
      return Object.assign({}, state, {
        user: action.user
      })
    case types.login.USER_LOGGED_OUT():
      return Object.assign({}, state, {
        user: null
      })
    case types.router.LOCATION_CHANGE():
      {
        return Object.assign({}, state, {
          page: action.payload.pathname
        })
      }
    default:
      return state
  }
}

export default update
