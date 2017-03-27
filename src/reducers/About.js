import { PropTypes } from 'react'
import About from '../components/About'

/** Define initial Redux state and React PropTypes */
const def = (props = false) => {
  const f = props ? (_, type) => type : (val, _) => val
  let r = { // initial Redux state and React PropTypes
    readMore: f(false, PropTypes.bool)
  }
  if (props) { // add more React PropTypes
    r = {...r}
  }
  return r
}
const initialState = def()
About.propTypes = def(true)

export default function update (state = initialState, action) {
  switch (action.type) {
    default:
      return state
  }
}
