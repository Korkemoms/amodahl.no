const initialState = {
  name: null,
  message: null,
  displayMessage: true,
  email: null,
  history: []
}

export default function update (state = initialState, action) {
  switch (action.type) {
    case '@@router/LOCATION_CHANGE': {
      let history = state.history.slice(0, 10)
      history.push(action.payload.pathname)

      return Object.assign({}, state, {
        history: history
      })
    }
    case 'UPDATE_LOGIN_INFO':
      return Object.assign({}, state, {
        message: action.message,
        displayMessage: action.displayMessage,
        loading: action.loading
      })
    case 'RECEIVE_AMODAHL_TOKEN':
      return Object.assign({}, state, {
        name: action.name,
        email: action.email
      })
    case '@@login/DELETE_AMODAHL_TOKEN':
      return Object.assign({}, state, {
        name: null,
        email: null,
        message: 'You logged out.',
        displayMessage: true
      })
    case '@@me/DELETE_AMODAHL_TOKEN':
      return Object.assign({}, state, {
        name: null,
        email: null,
        message: null,
        displayMessage: false
      })
    default:
      return state
  }
}
