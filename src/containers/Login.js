// @flow
import { connect } from 'react-redux'
import { login, logout } from '../actions/Login'
import Login from '../components/Login'
import { push } from 'react-router-redux'

const LoginContainer = ((Target, namespace) => {
  const mapDispatchToProps = { login, logout, push }

  const mapStateToProps = (state, ownProps) => state[namespace]

  return connect(mapStateToProps, mapDispatchToProps)(Target)
})(Login, 'login')

export default LoginContainer
