
import { connect } from 'react-redux'
import NavIndexLink from '../components/NavIndexLink'
import { setFadeInEnabled } from '../actions/Home'

const NavIndexLinkContainer = ((Target, namespace) => {
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
})(NavIndexLink, 'navIndexLink')

export default NavIndexLinkContainer
