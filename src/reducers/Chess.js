// @flow
import { types } from '../constants/ActionTypes'

type State = {
  jwToken: ?string,
  myEmail: ?string,
  myName: ?string
}

const initialState = {
  jwToken: null,
  myEmail: null,
  myName: null
}

const update = (state: State = initialState, action: Object) => {
  switch (action.type) {
    case types.login.RECEIVE_AMODAHL_TOKEN(): {
      return Object.assign({}, state, {
        jwToken: action.jwToken,
        user: action.user
      })
    }
    case types.login.USER_LOGGED_OUT():
      return Object.assign({}, state, {
        jwToken: null,
        myEmail: null,
        myName: null
      })
    default:
      return state
  }
}

export default  update
