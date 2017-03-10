const initialState = {
  readMore: false,
  jwToken: null,
  myEmail: null,
  myName: null,
  myFetch: null
}

export default function update (state = initialState, action) {
  switch (action.type) {
    case 'TOGGLE_READ_MORE':
      return Object.assign({}, state, {
        readMore: action.readMore
      })
    case 'RECEIVE_TOKEN_FROM_SERVER':
      return Object.assign({}, state, {
        jwToken: action.jwToken,
        myEmail: action.email,
        myName: action.name
      })
    case 'RECEIVE_TOKEN_FROM_LOCAL_STORAGE': {
      return Object.assign({}, state, {
        jwToken: action.jwToken,
        myEmail: action.email,
        myName: action.name
      })
    }
    case '@@me/DELETE_TOKEN':
      return Object.assign({}, state, {
        jwToken: null,
        myEmail: null,
        myName: null
      })
    case '@@login/DELETE_TOKEN':
      return Object.assign({}, state, {
        jwToken: null,
        myEmail: null,
        myName: null
      })
    default:
      return state
  }
}
