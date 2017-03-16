import { connect } from 'react-redux'
import LeveringMontering from '../components/LeveringMontering'

const LeveringMonteringContainer = ((Target, namespace) => {
  const mapDispatchToProps = {
  }

  const mapStateToProps = (state) => {
    const localState = namespace ? state[namespace] : state
    return {
      carouselIndex: localState.selectedIndex,
      carouselDirection: localState.direction
    }
  }

  return connect(mapStateToProps, mapDispatchToProps)(Target)
})(LeveringMontering, 'leveringMontering')

export default LeveringMonteringContainer
