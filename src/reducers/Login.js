import { PropTypes } from 'react'
import Login from '../components/Login'
import { types } from '../constants/ActionTypes'

/** Define initial Redux state and React PropTypes */
const def = (props = false) => {
  const f = props ? (_, type) => type : (val, _) => val
  let r = { // initial Redux state and React PropTypes
    message: f(null, PropTypes.string),
    displayMessage: f(false, PropTypes.bool),
    user: f(null, PropTypes.object),
    history: f([], PropTypes.array)
  }
  if (props) { // add more React PropTypes
    r = {...r}
  }
  return r
}
const initialState = def()
Login.propTypes = def(true)

export default function update (state = initialState, action) {
  switch (action.type) {
    case types.router.LOCATION_CHANGE: {
      let history = state.history.slice(0, 10)
      history.push(action.payload.pathname)

      return Object.assign({}, state, {
        history: history
      })
    }
    case types.login.UPDATE_LOGIN_INFO:
      return Object.assign({}, state, {
        message: action.message,
        displayMessage: action.displayMessage,
        loading: action.loading
      })
    case types.login.RECEIVE_AMODAHL_TOKEN:
      return Object.assign({}, state, {
        user: action.user
      })
    case types.login.USER_LOGGED_OUT:
      return Object.assign({}, state, {
        user: null,
        message: 'You logged out.',
        displayMessage: true
      })
    default:
      return state
  }
}
