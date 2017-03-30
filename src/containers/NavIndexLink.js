// @flow
import { connect } from 'react-redux'
import NavIndexLink from '../components/NavIndexLink'

const NavIndexLinkContainer = ((Target, namespace) => {
  const mapDispatchToProps = {}

  const mapStateToProps = (state) => ({})

  return connect(mapStateToProps, mapDispatchToProps)(Target)
})(NavIndexLink, 'navIndexLink')

export default NavIndexLinkContainer
