const initialState = {
  name: null,
  page: null
}

export default function update (state = initialState, action) {
  switch (action.type) {
    case 'RECEIVE_AMODAHL_TOKEN':
      return Object.assign({}, state, {
        name: action.name
      })
    case '@@me/DELETE_AMODAHL_TOKEN':
      return Object.assign({}, state, {
        name: null
      })
    case '@@login/DELETE_AMODAHL_TOKEN':
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
