// @flow
import type { Action } from '../actions/Types'
import { ActionTypes } from '../actions/Types'

type State = {
  url: ?string
}

const initialState = {
  url: null
}

const update = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case ActionTypes.FETCH_SIGNERE_URL:
      return Object.assign({}, state, {
        url: action.error ? null : action.payload
      })

    default:
      return state
  }
}

export default update
