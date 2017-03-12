
import { connect } from 'react-redux'
import { disableFadeIn } from '../actions/Home'
import Home from '../components/Home'

const HomeContainer = ((Target, namespace) => {
  const mapDispatchToProps = {
    disableFadeIn
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
