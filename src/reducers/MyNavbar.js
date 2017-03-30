// @flow
import { types } from '../constants/ActionTypes'

type State = {
  user: ?Object,
  page: ?string
}

const initialState = {
  user: null,
  page: null
}

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
    case '@@router/LOCATION_CHANGE': {
        return Object.assign({}, state, {
          page: action.payload.pathname
        })
      }
    default:
      return state
  }
}

export default update
