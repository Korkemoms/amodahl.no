// @flow
import { connect } from 'react-redux'
import NavLink from '../components/NavLink'

const NavLinkContainer = ((Target, namespace) => {
  const mapDispatchToProps = {}

  const mapStateToProps = (state) => ({})

  return connect(mapStateToProps, mapDispatchToProps)(Target)
})(NavLink, 'navLink')

export default NavLinkContainer
