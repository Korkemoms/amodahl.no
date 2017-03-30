// @flow
import { connect } from 'react-redux'
import AmodahlNo from '../components/AmodahlNo'

const AmodahlNoContainer = ((Target, namespace) => {
  const mapDispatchToProps = {}

  const mapStateToProps = (state) =>  ({})

  return connect(mapStateToProps, mapDispatchToProps)(Target)
})(AmodahlNo, 'amodahlNo')

export default AmodahlNoContainer
