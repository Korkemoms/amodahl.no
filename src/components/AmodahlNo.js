import React from 'react'

import '../MyContent.scss'
import '../App.scss'
import MyHeader from '../components/MyHeader'
import DocumentTitle from 'react-document-title'

import {
  Grid,
  PageHeader
} from 'react-bootstrap'

/* Purely presentational component */
const AmodahlNo = () => {
  return (
    <DocumentTitle title='About this website'>
      <div>
        <MyHeader headline='amodahl.no' />
        <div className='mycontent'>
          <Grid>
            <PageHeader>About this website</PageHeader>
            <p>
              This website is made with react, react-router, redux, bootstrap and other cool technologies.
              This setup is more than what is needed for a simple website like this but it
              is great for making more complex applications.
            </p>
            <PageHeader>Security</PageHeader>
            <p>
              The chess app requires you to identify yourself so that only you
              can move your own pieces. To make it safe and easy to do this
              I chose facebooks login mechanism. When you have logged in
              with facebook the client receives a facebook token, this token is
              then sent to the amodahl.no API where it checks that it is valid. It then
              responds with a JSON web token that gives you access to the API for some time.
            </p>
            <p>
              A <strong>JSON web token</strong> is a small string that is sent with every request to the API.
              To stop others from seeing the token (or other info) all communication
              with the API is encrypted with <strong>SSL</strong> (https).
            </p>
            <p><small>
              <label>{'Client:'}</label>{' '}
              <a href='https://github.com/Korkemoms/amodahl.no'>
                {'https://github.com/Korkemoms/amodahl.no'}</a>
              <br />
              <label>{'API:'}</label>{' '}
              <a href='https://github.com/Korkemoms/amodahl.no-api'>
                {'https://github.com/Korkemoms/amodahl.no-api'}</a>
            </small></p>
          </Grid>
        </div>

      </div>
    </DocumentTitle>

  )
}

export default AmodahlNo
