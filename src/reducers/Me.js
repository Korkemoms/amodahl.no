import { PropTypes } from 'react'
import Me from '../components/Me'
import { types } from '../constants/ActionTypes'

/** Define initial Redux state and React PropTypes */
const def = (props = false) => {
  const f = props ? (_, type) => type : (val, _) => val
  let r = { // initial Redux state and React PropTypes
    token: f(null, PropTypes.string),
    user: f(null, PropTypes.object),
    message: f(null, PropTypes.string)
  }
  if (props) { // add more React PropTypes
    r = { ...r}
  }
  return r
}
const initialState = def()
Me.propTypes = def(true)

export default function update (state = initialState, action) {
  switch (action.type) {

    case types.login.RECEIVE_AMODAHL_TOKEN:
      return Object.assign({}, state, {
        token: action.token,
        user: action.user,
        message: null
      })
    case types.login.REQUEST_AMODAHL_TOKEN_FAILED:
      return Object.assign({}, state, {
        token: null,
        user: null,
        message: null
      })
    case types.login.DELETE_AMODAHL_TOKEN:
      return Object.assign({}, state, {
        token: null,
        user: null,
        message: 'You logged out.'
      })
    default:
      return state
  }
}
