import { connect } from 'react-redux'
import { toggleReadMore } from '../actions/Chess'
import { myFetch } from '../actions/Login'
import Chess from '../components/Chess'
import { push } from 'react-router-redux'

const ChessContainer = ((Target, namespace) => {
  const mapDispatchToProps = (dispatch) => {
    return {
      toggleReadMore: (readMore) => {
        dispatch(toggleReadMore(readMore))
      },
      myFetch: myFetch(dispatch),
      navigate: (path) => {
        dispatch(push(path))
      }
    }
  }

  const mapStateToProps = (state) => {
    const localState = namespace ? state[namespace] : state
    let props = {
      readMore: localState.readMore,
      user: localState.user,
      jwToken: localState.jwToken
    }

    return props
  }

  return connect(mapStateToProps, mapDispatchToProps)(Target)
})(Chess, 'chess')

export default ChessContainer
