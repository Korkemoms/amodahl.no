// @flow
import { connect } from 'react-redux'
import { myFetch } from '../actions/Login'
import Chess from '../components/Chess'
import { push } from 'react-router-redux'

const ChessContainer = ((Target, namespace) => {
  const mapDispatchToProps = (dispatch) => {
    return {
      myFetch: myFetch(dispatch),
      push: (path) => dispatch(push(path))
    }
  }

  const mapStateToProps = (state) => state[namespace]

  // $FlowFixMe
  return connect(mapStateToProps, mapDispatchToProps)(Target)
})(Chess, 'chess')

export default ChessContainer
