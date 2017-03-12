
import { connect } from 'react-redux'
import { login, logout, testUserLogin } from '../actions/MyFetch'
import Login from '../components/Login'
import { push } from 'react-router-redux'

const LoginContainer = ((Target, namespace) => {
  const mapDispatchToProps = (dispatch) => {
    return {
      login: (local, server, callback) => {
        dispatch(login(local, server, callback))
      },
      testUserLogin: (name, email, mockFacebookId) => {
        dispatch(testUserLogin(true, true, name, email, mockFacebookId))
      },
      logout: () => {
        dispatch(logout('login'))
      },
      navigate: (path) => {
        dispatch(push(path))
      }
    }
  }

  const mapStateToProps = (state, ownProps) => {
    const localState = namespace ? state[namespace] : state

    return {
      jwToken: localState.jwToken,
      name: localState.name,
      email: localState.email,
      message: localState.message,
      displayMessage: localState.displayMessage,
      loading: localState.loading,
      history: localState.history
    }
  }

  return connect(mapStateToProps, mapDispatchToProps)(Target)
})(Login, 'login')

export default LoginContainer
