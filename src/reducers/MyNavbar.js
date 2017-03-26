import { PropTypes } from 'react'
import MyNavbar from '../components/MyNavbar'
import { types } from '../constants/ActionTypes'

/** Define initial Redux state and React PropTypes */
const def = (props = false) => {
  const f = props ? (_, type) => type : (val, _) => val
  let r = { // initial Redux state and React PropTypes
    user: f(null, PropTypes.object),
    page: f(null, PropTypes.string)
  }
  if (props) { // add more React PropTypes
    r = { ...r}
  }
  return r
}
const initialState = def()
MyNavbar.propTypes = def(true)

export default function update (state = initialState, action) {
  switch (action.type) {
    case types.login.RECEIVE_AMODAHL_TOKEN:
      return Object.assign({}, state, {
        user: action.user
      })
    case types.login.DELETE_AMODAHL_TOKEN:
      return Object.assign({}, state, {
        user: null
      })
    case types.router.LOCATION_CHANGE:
      {
        return Object.assign({}, state, {
          page: action.payload.pathname
        })
      }
    default:
      return state
  }
}
