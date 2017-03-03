import { connect } from 'react-redux'
import { toggleReadMore } from '../actions/Chess'
import Chess from '../components/Chess'

const ChessContainer = ((Target, namespace) => {
  const mapDispatchToProps = (dispatch) => {
    return {
      toggleReadMore: (readMore) => {
        let action = toggleReadMore(readMore)
        dispatch(action)
      }
    }
  }

  const mapStateToProps = (state) => {
    const localState = namespace ? state[namespace] : state
    return {
      readMore: localState.readMore,
      token: localState.token
    }
  }

  return connect(mapStateToProps, mapDispatchToProps)(Target)
})(Chess, 'chess')

export default ChessContainer
