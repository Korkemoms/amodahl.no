// @flow
import { connect } from 'react-redux'
import App from '../components/App'

const AppContainer = ((Target, namespace) => {
  const mapDispatchToProps = {}

  const mapStateToProps = (state) => ({})

  return connect(mapStateToProps, mapDispatchToProps)(Target)
})(App, 'app')

export default AppContainer
