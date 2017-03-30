// @flow
import { connect } from 'react-redux'
import Home from '../components/Home'
import { push } from 'react-router-redux'

const HomeContainer = ((Target, namespace) => {
  const mapDispatchToProps = dispatch => {
    return {
      navigate: (path) => dispatch(push(path))
    }
  }

  const mapStateToProps = (state) => {
    const localState = namespace ? state[namespace] : state
    return {
      fadeInEnabled: localState.fadeInEnabled
    }
  }

  return connect(mapStateToProps, mapDispatchToProps)(Target)
})(Home, 'home')

export default HomeContainer
