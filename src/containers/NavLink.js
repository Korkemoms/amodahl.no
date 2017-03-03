
import { connect } from 'react-redux'
import NavLink from '../components/NavLink'
import { setFadeInEnabled } from '../actions/Home'

const NavLinkContainer = ((Target, namespace) => {
  const mapDispatchToProps = (dispatch) => {
    return {
      setFadeInEnabled: (fadeInEnabled) => {
        let action = setFadeInEnabled(fadeInEnabled)
        dispatch(action)
      }
    }
  }

  const mapStateToProps = (state) => {
    // const localState = namespace ? state[namespace] : state
    return {
    }
  }

  return connect(mapStateToProps, mapDispatchToProps)(Target)
})(NavLink, 'navLink')

export default NavLinkContainer
