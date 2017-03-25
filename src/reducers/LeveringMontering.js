import { PropTypes } from 'react'
import LeveringMontering from '../components/LeveringMontering'

/** Define initial Redux state and React PropTypes */
const def = (props = false) => {
  const f = props ? (_, type) => type : (val, _) => val
  let r = { // initial Redux state and React PropTypes
    carouselIndex: f(0, PropTypes.bool),
    carouselDirection: f(null, PropTypes.string)
  }
  if (props) { // add more React PropTypes
    r = {myFetch: PropTypes.func, ...r}
  }
  return r
}

const initialState = def()
LeveringMontering.propTypes = def(true)

export default function update (state = initialState, action) {
  switch (action.type) {
    case '@@leveringMontering/CAROUSEL_SELECT':
      return Object.assign({}, state, {
        carouselIndex: action.selectedIndex,
        carouselDirection: action.direction
      })
    default:
      return state
  }
}
