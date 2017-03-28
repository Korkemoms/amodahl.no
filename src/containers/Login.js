
import { connect } from 'react-redux'
import { login, logout } from '../actions/Login'
import Login from '../components/Login'
import { push } from 'react-router-redux'

const LoginContainer = ((Target, namespace) => {
  const mapDispatchToProps = (dispatch) => {
    return {
      login: (...args) => {
        dispatch(login(...args))
      },
      logout: () => {
        dispatch(logout())
      },
      navigate: (...args) => {
        dispatch(push(...args))
      }
    }
  }

  const mapStateToProps = (state, ownProps) => {
    const localState = namespace ? state[namespace] : state

    return {
      jwToken: localState.jwToken,
      user: localState.user,
      message: localState.message,
      displayMessage: localState.displayMessage,
      loading: localState.loading,
      history: localState.history
    }
  }

  return connect(mapStateToProps, mapDispatchToProps)(Target)
})(Login, 'login')

export default LoginContainer
