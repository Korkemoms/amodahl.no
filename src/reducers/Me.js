const initialState = {
  token: null,
  user: null,
  message: null
}

export default function update (state = initialState, action) {
  switch (action.type) {

    case 'RECEIVE_AMODAHL_TOKEN':
      return Object.assign({}, state, {
        token: action.token,
        user: action.user,
        message: null
      })
    case 'REQUEST_AMODAHL_TOKEN_FAILED':
      return Object.assign({}, state, {
        token: null,
        user: null,
        message: null
      })
    case '@@me/DELETE_AMODAHL_TOKEN':
      return Object.assign({}, state, {
        token: null,
        user: null,
        message: 'You logged out.'
      })
    case '@@login/DELETE_AMODAHL_TOKEN':
      return Object.assign({}, state, {
        token: null,
        user: null,
        message: 'You logged out.'
      })
    default:
      return state
  }
}
