
import { connect } from 'react-redux'
import { login, logout, testUserLogin } from '../actions/MyFetch'
import Login from '../components/Login'

const LoginContainer = ((Target, namespace) => {
  const mapDispatchToProps = (dispatch) => {
    return {
      login: (onlySearchLocalStorage) => {
        let action = login(onlySearchLocalStorage)
        dispatch(action)
      },
      testUserLogin: (name, email, mock_facebook_id) => {
        let action = testUserLogin(name, email, mock_facebook_id)
        dispatch(action)
      },
      logout: () => {
        let action = logout('login')
        dispatch(action)
      }
    }
  }

  const mapStateToProps = (state) => {
    const localState = namespace ? state[namespace] : state
    return {
      jwToken: localState.jwToken,
      name: localState.name,
      email: localState.email,
      message: localState.message,
      displayMessage: localState.displayMessage,
      loading: localState.loading
    }
  }

  return connect(mapStateToProps, mapDispatchToProps)(Target)
})(Login, 'login')

export default LoginContainer
