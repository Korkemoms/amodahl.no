// @flow
import { connect } from 'react-redux'
import MatrixMultiplication from '../components/MatrixMultiplication'

const MatrixMultiplicationContainer = ((Target, namespace) => {
  const mapDispatchToProps = {}

  const mapStateToProps = (state) => ({})

  return connect(mapStateToProps, mapDispatchToProps)(Target)
})(MatrixMultiplication, 'matrixMultiplication')

export default MatrixMultiplicationContainer
