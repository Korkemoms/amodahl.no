import React from 'react'

import '../MyContent.scss'
import '../App.scss'
import MyHeader from '../components/MyHeader'
import {LinkContainer} from 'react-router-bootstrap'
import DocumentTitle from 'react-document-title'

import {
  Grid,
  Button,
  FormGroup,
  ControlLabel,
  FormControl
  // HelpBlock
} from 'react-bootstrap'

/* function FieldGroup ({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  )
} */

/* Purely presentational component */
const Me = ({ logout, token, user, message, navigate }) => {
  const logoutButton = token !== null
    ? <Button bsStyle='warning' onClick={() => {
      navigate('/login')
      logout()
    }}>
        Log out
      </Button>
    : ''

  const loginButton = token === null
    ? <LinkContainer to={{ pathname: '/login' }} ><Button
      bsStyle='primary'>
        Log in
      </Button></LinkContainer>
    : ''

  const form = token !== null
    ? <form>
      <FormGroup>
        <ControlLabel>Name</ControlLabel>
        <FormControl.Static>
          {user.name}
        </FormControl.Static>
      </FormGroup>

      <FormGroup>
        <ControlLabel>Email</ControlLabel>
        <FormControl.Static>
          {user.email}
        </FormControl.Static>
      </FormGroup>

      <FormGroup>
        <ControlLabel>ID</ControlLabel>
        <FormControl.Static>
          {user.uid}
        </FormControl.Static>
      </FormGroup>

    </form>
    : ''

  return (

    <DocumentTitle title='Current user'>
      <div>

        <MyHeader headline='Current user' />

        <div className='mycontent' style={{background: 'white'}}>
          <Grid>
            {form}
            {logoutButton}
            {loginButton}
            <p><label>{message}</label></p>

          </Grid>
        </div>

      </div>
    </DocumentTitle>
  )
}

export default Me
