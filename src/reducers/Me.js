const initialState = {
  token: null,
  name: null,
  email: null,
  message: null
}

export default function update (state = initialState, action) {
  switch (action.type) {

    case 'RECEIVE_TOKEN_FROM_AMODAHL':
      return Object.assign({}, state, {
        token: action.token,
        name: action.name,
        email: action.email,
        message: null
      })
    case 'RECEIVE_TOKEN_FROM_LOCAL_STORAGE':
      return Object.assign({}, state, {
        token: action.token,
        name: action.name,
        email: action.email,
        message: null
      })
    case 'REQUEST_TOKEN_FAILED':
      return Object.assign({}, state, {
        token: null,
        name: null,
        email: null,
        message: null
      })
    case '@@me/DELETE_TOKEN':
      return Object.assign({}, state, {
        token: null,
        name: null,
        email: null,
        message: 'You logged out.'
      })
    case '@@login/DELETE_TOKEN':
      return Object.assign({}, state, {
        token: null,
        name: null,
        email: null,
        message: 'You logged out.'
      })
    default:
      return state
  }
}
