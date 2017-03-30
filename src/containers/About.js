// @flow
import { connect } from 'react-redux'
import About from '../components/About'

const AboutContainer = ((Target, namespace) => {
  const mapDispatchToProps = {}

  const mapStateToProps = (state) => ({})

  return connect(mapStateToProps, mapDispatchToProps)(Target)
})(About, 'about')

export default AboutContainer
