import { PropTypes } from 'react'
import Chess from '../components/Chess'

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
