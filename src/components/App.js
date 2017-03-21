import React from 'react'
import MyNavbar from '../containers/MyNavbar'
import DocumentTitle from 'react-document-title'

export default class App extends React.Component {
  render () {
    const footerInstance = (

      <address className='Footer'>

        <div>
          <a style={{fontSize: '18px', color: 'white'}} href='https://www.facebook.com/andreas.modahl'>
            <i className='fa fa-facebook-official fa-2x' aria-hidden='true' />
          </a>
        </div>
        <div>
          <a style={{color: 'white'}} href='mailto:a_modahl@hotmail.com'>
            {'a_modahl@hotmail.com'}
          </a><br />
          {'© 2017 Andreas Modahl'}
        </div>

      </address>
    )

    return (
      <DocumentTitle title='amodahl.no'>
        <div>
          <MyNavbar />
          {this.props.children}
          {footerInstance}
        </div>
      </DocumentTitle>
    )
  }
}
