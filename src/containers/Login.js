
import { connect } from 'react-redux'
import { login, logout } from '../actions/Login'
import Login from '../components/Login'

const LoginContainer = ((Target, namespace) => {
  const mapDispatchToProps = (dispatch) => {
    return {
      login: (onlySearchLocalStorage) => {
        let action = login(onlySearchLocalStorage)
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
      token: localState.token,
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
