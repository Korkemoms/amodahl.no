const initialState = {
  readMore: false,
  token: null
}

export default function update (state = initialState, action) {
  switch (action.type) {
    case 'TOGGLE_READ_MORE':
      return Object.assign({}, state, {
        readMore: action.readMore
      })
    case 'RECEIVE_TOKEN_FROM_SERVER':
      return Object.assign({}, state, {
        token: action.token
      })
    case 'RECEIVE_TOKEN_FROM_LOCAL_STORAGE':
      return Object.assign({}, state, {
        token: action.token
      })
    default:
      return state
  }
}
