import { connect } from 'react-redux'
import App from '../components/App'

const AppContainer = ((Target, namespace) => {
  const mapDispatchToProps = (dispatch) => {
    return {}
  }

  const mapStateToProps = (state) => {
    // const localState = namespace ? state[namespace] : state
    return {}
  }

  return connect(mapStateToProps, mapDispatchToProps)(Target)
})(App, 'app')

export default AppContainer
