// @flow
import type { Action } from '../actions/Types'
import { ActionTypes } from '../actions/Types'

type State = {
  token: ?string,
  myEmail: ?string,
  myName: ?string
}

const initialState = {
  token: null,
  myEmail: null,
  myName: null
}

const update = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case ActionTypes.FETCH_AMODAHL_TOKEN: {
      return Object.assign({}, state, {
        token: action.error ? null : action.payload.token,
        user: action.error ? null : action.payload.user
      })
    }
    case ActionTypes.USER_LOGGED_OUT:
      return Object.assign({}, state, {
        token: null,
        myEmail: null,
        myName: null
      })
    default:
      return state
  }
}

export default update
