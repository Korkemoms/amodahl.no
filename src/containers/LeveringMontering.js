// @flow
import { connect } from 'react-redux'
import LeveringMontering from '../components/LeveringMontering'
import { push } from 'react-router-redux'

const LeveringMonteringContainer = ((Target, namespace) => {
  const mapDispatchToProps = { push }

  const mapStateToProps = (state) => ({})

  return connect(mapStateToProps, mapDispatchToProps)(Target)
})(LeveringMontering, 'leveringMontering')

export default LeveringMonteringContainer
