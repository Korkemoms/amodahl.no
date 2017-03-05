
import { connect } from 'react-redux'
import { logout } from '../actions/MyFetch'
import Me from '../components/Me'

const MeContainer = ((Target, namespace) => {
  const mapDispatchToProps = (dispatch) => {
    return {
      logout: () => {
        let action = logout('me')
        dispatch(action)
      }
    }
  }

  const mapStateToProps = (state) => {
    const localState = namespace ? state[namespace] : state
    return {
      token: localState.token,
      name: localState.name,
      email: localState.email,
      message: localState.message
    }
  }

  return connect(mapStateToProps, mapDispatchToProps)(Target)
})(Me, 'me')

export default MeContainer
