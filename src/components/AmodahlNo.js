import React from 'react'

import '../JumbotronMini.scss'
import '../App.scss'
import MyHeader from '../components/MyHeader'

import {
  Grid,
  Jumbotron
} from 'react-bootstrap'

const AmodahlNo = () => {
  return (
    <div>
      <MyHeader headline='amodahl.no' />

      <div style={{background: 'white'}}>

        <Jumbotron className='jumbotron-mini' style={{background: 'white'}}>
          <Grid>
            <h1>About this website</h1>
            <p>
              This website is made with react, react-router, redux and bootstrap.
              This combination is more than what is needed for a simple website like this but it
              is great for making more complex applications. You can look
              at the source code here: <a href='https://github.com/Korkemoms/amodahl.no/'>
                {'https://github.com/Korkemoms/amodahl.no/'}</a>
            </p>
          </Grid>
        </Jumbotron>
      </div>
    </div>

  )
}

export default AmodahlNo
