// @flow
import { connect } from 'react-redux'
import SignereLogin from '../components/SignereLogin'
import { login } from '../actions/Login'
import { push } from 'react-router-redux'

const SignereLoginContainer = ((Target, namespace) => {
  const mapDispatchToProps = { login, push }

  const mapStateToProps = (state, ownProps) => state[namespace]

  return connect(mapStateToProps, mapDispatchToProps)(Target)
})(SignereLogin, 'signereLogin')

export default SignereLoginContainer
