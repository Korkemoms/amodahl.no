import { connect } from 'react-redux'
import AmodahlNo from '../components/AmodahlNo'

const AmodahlNoContainer = ((Target, namespace) => {
  const mapDispatchToProps = (dispatch) => {
    return {}
  }

  const mapStateToProps = (state) => {
    // const localState = namespace ? state[namespace] : state
    return {}
  }

  return connect(mapStateToProps, mapDispatchToProps)(Target)
})(AmodahlNo, 'amodahlNo')

export default AmodahlNoContainer
