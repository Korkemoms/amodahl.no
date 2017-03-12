
import { connect } from 'react-redux'
import NavLink from '../components/NavLink'
import { disableFadeIn } from '../actions/Home'

const NavLinkContainer = ((Target, namespace) => {
  const mapDispatchToProps = {
    disableFadeIn
  }

  const mapStateToProps = (state) => {
    // const localState = namespace ? state[namespace] : state
    return {
    }
  }

  return connect(mapStateToProps, mapDispatchToProps)(Target)
})(NavLink, 'navLink')

export default NavLinkContainer
