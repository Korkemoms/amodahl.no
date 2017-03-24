
import { connect } from 'react-redux'
import { logout } from '../actions/Login'
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
      user: localState.user,
      message: localState.message
    }
  }

  return connect(mapStateToProps, mapDispatchToProps)(Target)
})(Me, 'me')

export default MeContainer
