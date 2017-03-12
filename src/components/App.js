import React from 'react'
import MyNavbar from '../containers/MyNavbar'

const App = ({ children }) => {
  const footerInstance = (
    <div className='Footer'><address>
      <i className='fa fa-envelope-o' aria-hidden='true' />
      {' a_modahl@hotmail.com'}<br />
      {'© 2017 Andreas Modahl'}
    </address></div>
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
