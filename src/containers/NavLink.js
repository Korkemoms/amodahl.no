
import { connect } from 'react-redux'
import NavLink from '../components/NavLink'

const NavLinkContainer = ((Target, namespace) => {
  const mapDispatchToProps = {
  }

  const mapStateToProps = (state) => {
    // const localState = namespace ? state[namespace] : state
    return {
    }
  }

  return connect(mapStateToProps, mapDispatchToProps)(Target)
})(NavLink, 'navLink')

export default NavLinkContainer
