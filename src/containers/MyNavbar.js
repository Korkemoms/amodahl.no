
import { connect } from 'react-redux'
import MyNavbar from '../components/MyNavbar'

const MyNavbarContainer = ((Target, namespace) => {
  const mapDispatchToProps = (dispatch) => {
    return {
    }
  }

  const mapStateToProps = (state) => {
    const localState = namespace ? state[namespace] : state

    return {
      name: localState.name,
      page: localState.page
    }
  }

  return connect(mapStateToProps, mapDispatchToProps)(Target)
})(MyNavbar, 'myNavbar')

export default MyNavbarContainer
