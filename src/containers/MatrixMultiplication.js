// @flow
import { connect } from 'react-redux'
import MatrixMultiplication from '../components/MatrixMultiplication'

const MatrixMultiplicationContainer = ((Target, namespace) => {
  const mapDispatchToProps = {
  }

  const mapStateToProps = (state) => {
    // const localState = namespace ? state[namespace] : state
    return {}
  }

  return connect(mapStateToProps, mapDispatchToProps)(Target)
})(MatrixMultiplication, 'matrixMultiplication')

export default MatrixMultiplicationContainer
