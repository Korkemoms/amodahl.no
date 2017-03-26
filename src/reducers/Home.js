import { PropTypes } from 'react'
import Home from '../components/Chess'
import { types } from '../constants/ActionTypes'

/** Define initial Redux state and React PropTypes */
const def = (props = false) => {
  const f = props ? (_, type) => type : (val, _) => val
  let r = { // initial Redux state and React PropTypes
    fadeInEnabled: f(true, PropTypes.bool)
  }
  if (props) { // add more React PropTypes
    r = { ...r}
  }
  return r
}
const initialState = def()
Home.propTypes = def(true)

export default function update (state = initialState, action) {
  switch (action.type) {
    case types.home.DISABLE_FADE_IN:
      return Object.assign({}, state, {
        fadeInEnabled: false
      })
    case types.home.ENABLE_FADE_IN:
      return Object.assign({}, state, {
        fadeInEnabled: true
      })
    default:
      return state
  }
}
