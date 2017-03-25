import { PropTypes } from 'react'
import SignereLogin from '../components/SignereLogin'

/** Define initial Redux state and React PropTypes */
const def = (props = false) => {
  const f = props ? (_, type) => type : (val, _) => val
  let r = { // initial Redux state and React PropTypes
    url: f(null, PropTypes.string)
  }
  if (props) { // add more React PropTypes
    r = { ...r}
  }
  return r
}
const initialState = def()
SignereLogin.propTypes = def(true)

export default function update (state = initialState, action) {
  switch (action.type) {
    case 'RECEIVE_SIGNERE_URL':
      return Object.assign({}, state, {
        url: action.url,
        accessToken: action.accessToken
      })

    default:
      return state
  }
}
