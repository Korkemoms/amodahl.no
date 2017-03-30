// @flow
import { connect } from 'react-redux'
import App from '../components/App'

const AppContainer = ((Target, namespace) => {
  const mapDispatchToProps = {}

  const mapStateToProps = (state) => {
    // const localState = namespace ? state[namespace] : state
    return {}
  }

  return connect(mapStateToProps, mapDispatchToProps)(Target)
})(App, 'app')

export default AppContainer
