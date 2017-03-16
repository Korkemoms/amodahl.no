import React from 'react'

import '../MyContent.scss'
import '../App.scss'
import MyHeader from '../components/MyHeader'
import DocumentTitle from 'react-document-title'

import {
  Grid
} from 'react-bootstrap'

const AmodahlNo = () => {
  return (
    <DocumentTitle title='About this website'>
      <div>
        <MyHeader headline='amodahl.no' />
        <div className='mycontent' style={{background: 'white'}}>
          <Grid>
            <h1>About this website</h1>
            <p>
              This website is made with react, react-router, redux and bootstrap.
              This combination is more than what is needed for a simple website like this but it
              is great for making more complex applications. You can look
              at the source code here: <a href='https://github.com/Korkemoms/amodahl.no'>
                {'https://github.com/Korkemoms/amodahl.no'}</a>
            </p>
          </Grid>
        </div>

      </div>
    </DocumentTitle>

  )
}

export default AmodahlNo
