// @flow
import { connect } from 'react-redux'
import MyNavbar from '../components/MyNavbar'

const MyNavbarContainer = ((Target, namespace) => {
  const mapDispatchToProps = {}

  const mapStateToProps = (state) => state[namespace]

  return connect(mapStateToProps, mapDispatchToProps)(Target)
})(MyNavbar, 'myNavbar')

export default MyNavbarContainer
