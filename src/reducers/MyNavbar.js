// @flow
import type { Action } from '../actions/Types'
import { ActionTypes } from '../actions/Types'

type State = {
  user: ?Object,
  page: ?string
}

const initialState = {
  user: null,
  page: null
}

const update = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case ActionTypes.FETCH_AMODAHL_TOKEN:
      return Object.assign({}, state, {
        user: action.error ? null : action.payload.user
      })
    case ActionTypes.USER_LOGGED_OUT:
      return Object.assign({}, state, {
        user: null
      })
    case '@@router/LOCATION_CHANGE':
      return Object.assign({}, state, {
        page: action.payload.pathname
      })
    default:
      return state
  }
}

export default update
