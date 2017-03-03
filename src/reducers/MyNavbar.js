const initialState = {
  name: null,
  page: null
}

export default function update (state = initialState, action) {
  switch (action.type) {
    case 'RECEIVE_TOKEN_FROM_SERVER':
      return Object.assign({}, state, {
        name: action.name
      })
    case 'RECEIVE_TOKEN_FROM_LOCAL_STORAGE':
      return Object.assign({}, state, {
        name: action.name
      })
    case 'REQUEST_TOKEN_FAILED':
      return Object.assign({}, state, {
        name: null
      })
    case '@@me/DELETE_TOKEN':
      return Object.assign({}, state, {
        name: null
      })
    case '@@login/DELETE_TOKEN':
      return Object.assign({}, state, {
        name: null
      })
    case '@@router/LOCATION_CHANGE':
      {
        return Object.assign({}, state, {
          page: action.payload.pathname
        })
      }
    default:
      return state
  }
}
