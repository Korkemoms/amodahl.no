
import { connect } from 'react-redux'
import NavIndexLink from '../components/NavIndexLink'
import { disableFadeIn } from '../actions/Home'

const NavIndexLinkContainer = ((Target, namespace) => {
  const mapDispatchToProps = (dispatch) => {
    return {
      disableFadeIn: () => {
        let action = disableFadeIn()
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
