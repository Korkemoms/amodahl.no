import React from 'react'

import '../MyContent.scss'
import '../App.scss'
import MyHeader from '../components/MyHeader'
import DocumentTitle from 'react-document-title'

import {
  Grid
} from 'react-bootstrap'

const SignereLogin = ({url, navigate}) => {
  return (
    <DocumentTitle title='Signere log in'>
      <div>
        <MyHeader headline='Log in with signere.no' />

        <div className='mycontent'>
          <Grid>
          // TODO
          </Grid>
        </div>
      </div>
    </DocumentTitle>
  )
}

export default SignereLogin
