import React, { PropTypes } from 'react'

import '../JumbotronMini.scss'
import '../App.scss'
import MyHeader from '../components/MyHeader'
import {LinkContainer} from 'react-router-bootstrap'

import {
  Grid,
  Jumbotron,
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

const Me = ({ logout, token, name, email, message }) => {
  const logoutButton = token !== null
    ? <Button bsStyle='warning' onClick={() => { logout('me') }}>
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
          {name}
        </FormControl.Static>
      </FormGroup>

      <FormGroup>
        <ControlLabel>Email</ControlLabel>
        <FormControl.Static>
          {email}
        </FormControl.Static>
      </FormGroup>

    </form>
    : ''

  return (
    <div>

      <MyHeader headline='Current user' />

      <div style={{background: 'white'}}>

        <Jumbotron className='jumbotron-mini' style={{background: 'white'}}>
          <Grid>
            {form}
            {logoutButton}
            {loginButton}
            <p><label>{message}</label></p>

          </Grid>
        </Jumbotron>
      </div>
    </div>
  )
}

export default Me
