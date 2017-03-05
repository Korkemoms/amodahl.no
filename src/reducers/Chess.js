const initialState = {
  readMore: false,
  jwToken: null
}

export default function update (state = initialState, action) {
  switch (action.type) {
    case 'TOGGLE_READ_MORE':
      return Object.assign({}, state, {
        readMore: action.readMore
      })
    case 'RECEIVE_TOKEN_FROM_SERVER':
      return Object.assign({}, state, {
        jwToken: action.jwToken
      })
    case 'RECEIVE_TOKEN_FROM_LOCAL_STORAGE':
      return Object.assign({}, state, {
        jwToken: action.jwToken
      })
    case '@@me/DELETE_TOKEN':
      return Object.assign({}, state, {
        jwToken: null
      })
    case '@@login/DELETE_TOKEN':
      return Object.assign({}, state, {
        jwToken: null
      })
    default:
      return state
  }
}
