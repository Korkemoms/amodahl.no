// @flow
import { connect } from 'react-redux'
import Home from '../components/Home'
import { push } from 'react-router-redux'

const HomeContainer = ((Target, namespace) => {
  const mapDispatchToProps = { push }

  const mapStateToProps = (state) => state[namespace]

  return connect(mapStateToProps, mapDispatchToProps)(Target)
})(Home, 'home')

export default HomeContainer
