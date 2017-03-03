/*
import { connect } from 'react-redux'
import MyHeader from '../components/MyHeader'

const MyHeaderContainer = ((Target, namespace) => {
  const mapDispatchToProps = (dispatch) => {
    return {
    }
  }

  const mapStateToProps = (state) => {
    const localState = namespace ? state[namespace] : state
    return {
      headline: localState.headline
    }
  }

  return connect(mapStateToProps, mapDispatchToProps)(Target)
})(MyHeader, 'myHeader')

export default MyHeaderContainer
*/
