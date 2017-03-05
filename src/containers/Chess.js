import { connect } from 'react-redux'
import { toggleReadMore } from '../actions/Chess'
import { myFetch } from '../actions/MyFetch'
import Chess from '../components/Chess'

const ChessContainer = ((Target, namespace) => {
  const mapDispatchToProps = (dispatch) => {
    return {
      toggleReadMore: (readMore) => {
        let action = toggleReadMore(readMore)
        dispatch(action)
      },
      dispatch: dispatch
    }
  }

  const mapStateToProps = (state) => {
    const localState = namespace ? state[namespace] : state

    let props = {
      readMore: localState.readMore
    }

    if (localState.jwToken && localState.jwToken !== null) {
      props = {
        myFetch: (dispatch) => myFetch(localState.jwToken, dispatch),
        ...props
      }
    }

    return props
  }

  return connect(mapStateToProps, mapDispatchToProps)(Target)
})(Chess, 'chess')

export default ChessContainer
