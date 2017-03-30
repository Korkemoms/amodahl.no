// @flow
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
const Me = (props: {
  logout: Function,
  token: ?string,
  user: Object,
  message: string,
  push: Function
}) => {
  const logoutButton = props.token !== null
    ? <Button bsStyle='warning' onClick={() => {
      props.push('/login')
      props.logout()
    }}>
        Log out
      </Button>
    : ''

  const loginButton = props.token === null
    ? <LinkContainer to={{ pathname: '/login' }} ><Button
      bsStyle='primary'>
        Log in
      </Button></LinkContainer>
    : ''

  const form = props.token !== null
    ? <form>
      <FormGroup>
        <ControlLabel>Name</ControlLabel>
        <FormControl.Static>
          {props.user.name}
        </FormControl.Static>
      </FormGroup>

      <FormGroup>
        <ControlLabel>Email</ControlLabel>
        <FormControl.Static>
          {props.user.email}
        </FormControl.Static>
      </FormGroup>

      <FormGroup>
        <ControlLabel>ID</ControlLabel>
        <FormControl.Static>
          {props.user.uid}
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
            <p><label>{props.message}</label></p>

          </Grid>
        </div>

      </div>
    </DocumentTitle>
  )
}

export default Me
