// @flow
import { connect } from 'react-redux'
import { logout } from '../actions/Login'
import Me from '../components/Me'
import { push } from 'react-router-redux'

const MeContainer = ((Target, namespace) => {
  const mapDispatchToProps = { logout,push }

  const mapStateToProps = (state) => state[namespace]

  return connect(mapStateToProps, mapDispatchToProps)(Target)
})(Me, 'me')

export default MeContainer
