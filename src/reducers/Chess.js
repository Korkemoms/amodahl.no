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
    case 'RECEIVE_AMODAHL_TOKEN': {
      return Object.assign({}, state, {
        jwToken: action.jwToken,
        user: action.user
      })
    }
    case '@@me/DELETE_AMODAHL_TOKEN':
      return Object.assign({}, state, {
        jwToken: null,
        myEmail: null,
        myName: null
      })
    case '@@login/DELETE_AMODAHL_TOKEN':
      return Object.assign({}, state, {
        jwToken: null,
        myEmail: null,
        myName: null
      })
    default:
      return state
  }
}
