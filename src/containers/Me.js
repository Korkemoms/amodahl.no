// @flow
import { connect } from 'react-redux'
import { logout } from '../actions/Login'
import Me from '../components/Me'
import { push } from 'react-router-redux'

const MeContainer = ((Target, namespace) => {
  const mapDispatchToProps = (dispatch) => {
    return {
      logout: (...args) => dispatch(logout(...args)),
      navigate: (...args) => dispatch(push(...args))
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
