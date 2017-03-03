import { connect } from 'react-redux'
import About from '../components/About'

const AboutContainer = ((Target, namespace) => {
  const mapDispatchToProps = (dispatch) => {
    return {}
  }

  const mapStateToProps = (state) => {
    // const localState = namespace ? state[namespace] : state
    return {}
  }

  return connect(mapStateToProps, mapDispatchToProps)(Target)
})(About, 'about')

export default AboutContainer
