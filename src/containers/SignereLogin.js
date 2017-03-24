
import { connect } from 'react-redux'
import SignereLogin from '../components/SignereLogin'
import { login } from '../actions/Login'
import { push } from 'react-router-redux'

const SignereLoginContainer = ((Target, namespace) => {
  const mapDispatchToProps = (dispatch) => {
    return {
      login: (...args) => {
        dispatch(login(...args))
      },
      navigate: (...args) => {
        dispatch(push(...args))
      }
    }
  }

  const mapStateToProps = (state, ownProps) => {
    const localState = namespace ? state[namespace] : state

    return {
      url: localState.url
    }
  }

  return connect(mapStateToProps, mapDispatchToProps)(Target)
})(SignereLogin, 'signereLogin')

export default SignereLoginContainer
