// @flow
import { connect } from 'react-redux'
import LeveringMontering from '../components/LeveringMontering'
import { push } from 'react-router-redux'
import type { State } from '../reducers/Login'

const LeveringMonteringContainer = ((Target, namespace) => {
  const mapDispatchToProps = { push }

  const mapStateToProps = (state) => ({})

  return connect(mapStateToProps, mapDispatchToProps)(Target)
})(LeveringMontering, 'leveringMontering')

export default LeveringMonteringContainer
