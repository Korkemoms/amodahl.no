import { connect } from 'react-redux'
import LeveringMontering from '../components/LeveringMontering'
import { push } from 'react-router-redux'

const LeveringMonteringContainer = ((Target, namespace) => {
  const mapDispatchToProps = dispatch => {
    return {
      navigate: (path) => {
        dispatch(push(path))
      }
    }
  }

  const mapStateToProps = (state) => {
    // const localState = namespace ? state[namespace] : state
    return {
    }
  }

  return connect(mapStateToProps, mapDispatchToProps)(Target)
})(LeveringMontering, 'leveringMontering')

export default LeveringMonteringContainer
