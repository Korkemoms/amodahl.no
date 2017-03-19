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

    case 'REQUEST_TOKEN_FROM_LOCAL_STORAGE':
      return Object.assign({}, state, {
        message: 'Looking for user info in local storage...',
        displayMessage: true,
        loading: true
      })
    case 'REQUEST_TOKEN_FROM_FACEBOOK':
      return Object.assign({}, state, {
        message: 'Logging in to facebook...',
        displayMessage: true,
        loading: true
      })
    case 'REQUEST_TOKEN_FROM_AMODAHL':
      return Object.assign({}, state, {
        message: 'Logging in to amodahl.no...',
        displayMessage: true,
        loading: true
      })
    case 'REQUEST_TOKEN_FROM_SIGNERE':
      return Object.assign({}, state, {
        message: 'Logging in to signere.no...',
        displayMessage: true,
        loading: true
      })
    case 'REQUEST_TOKEN_FROM_GOOGLE':
      return Object.assign({}, state, {
        message: 'Logging in to google...',
        displayMessage: true,
        loading: true
      })
    case 'RECEIVE_TOKEN_FROM_AMODAHL':
      return Object.assign({}, state, {
        name: action.name,
        email: action.email,
        message: `You logged in as ${action.name}.`,
        displayMessage: true,
        loading: false
      })
    case 'RECEIVE_TOKEN_FROM_LOCAL_STORAGE':
      return Object.assign({}, state, {
        name: action.name,
        email: action.email,
        message: `You logged in as ${action.name}.`,
        displayMessage: true,
        loading: false
      })
    case 'REQUEST_TOKEN_FAILED':
      return Object.assign({}, state, {
        name: null,
        email: null,
        message: action.message,
        displayMessage: action.displayMessage,
        loading: false
      })
    case '@@login/DELETE_TOKEN':
      return Object.assign({}, state, {
        name: null,
        email: null,
        message: 'You logged out.',
        displayMessage: true
      })
    case '@@me/DELETE_TOKEN':
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
