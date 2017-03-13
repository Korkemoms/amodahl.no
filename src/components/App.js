import React from 'react'
import MyNavbar from '../containers/MyNavbar'

const App = ({ children }) => {
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
    <div className='App-root'>
      <MyNavbar />

      {children}
      {footerInstance}

    </div>
  )
}

export default App
