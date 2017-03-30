// @flow
import { types } from '../constants/ActionTypes'

type State = {
  url: ?string
}

const initialState = {
  url: null
}

const update = (state: State = initialState, action: Object) => {
  switch (action.type) {
    case types.login.RECEIVE_SIGNERE_URL():
      return Object.assign({}, state, {
        url: action.url,
        accessToken: action.accessToken
      })

    default:
      return state
  }
}

export default update
