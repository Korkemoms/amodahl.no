import { PropTypes } from 'react'
import Chess from '../components/Chess'
import { types } from '../constants/ActionTypes'

/** Define initial Redux state and React PropTypes */
const def = (props = false) => {
  const f = props ? (_, type) => type : (val, _) => val
  let r = { // initial Redux state and React PropTypes
    readMore: f(false, PropTypes.bool),
    jwToken: f(null, PropTypes.string),
    myEmail: f(false, PropTypes.string),
    myName: f(false, PropTypes.string)
  }
  if (props) { // add more React PropTypes
    r = {myFetch: PropTypes.func, ...r}
  }
  return r
}
const initialState = def()
Chess.propTypes = def(true)

export default function update (state = initialState, action) {
  switch (action.type) {
    case types.login.RECEIVE_AMODAHL_TOKEN(): {
      return Object.assign({}, state, {
        jwToken: action.jwToken,
        user: action.user
      })
    }
    case types.login.USER_LOGGED_OUT():
      return Object.assign({}, state, {
        jwToken: null,
        myEmail: null,
        myName: null
      })
    default:
      return state
  }
}
