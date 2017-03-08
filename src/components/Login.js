import React, { PropTypes } from 'react'

import '../JumbotronMini.scss'
import '../App.scss'
import MyHeader from '../components/MyHeader'
import {LinkContainer} from 'react-router-bootstrap'

import {
  Grid,
  Jumbotron,
  Button,
  ButtonToolbar,
  DropdownButton,
  MenuItem
} from 'react-bootstrap'

const Login = ({login, testUserLogin, logout, name, loading, message, displayMessage}) => {
  let key = 1

  const loginButton = name === null
  ? <Button
    key={key++}
    bsStyle='primary'
    onClick={() => { login(false, true) }}
    disabled={loading}>
      Log in with facebook
    </Button>
  : <Button
    key={key++}
    bsStyle='warning'
    onClick={() => { logout() }}
    disabled={loading}>
      Log out
    </Button>

  const meButton = name !== null
  ? <LinkContainer to={{ pathname: '/me' }} key={key++}><Button
    bsStyle='primary'
    disabled={loading}>
      Details
    </Button></LinkContainer>
  : ''

  const testUserSelection = process.env.NODE_ENV !== 'production' && name === null
    ? <DropdownButton key={key++} title='Test Users' id='test-users'>
      <MenuItem eventKey='1' onClick={() => testUserLogin('Potetsalat', 'potet@salat.com', '123')}
        >Potetsalat</MenuItem>
      <MenuItem eventKey='2' onClick={() => testUserLogin('Blomkål', 'blomkål@suppe.no', '456')}
        >Blomkål</MenuItem>
      <MenuItem eventKey='3' onClick={() => testUserLogin('Kjøtthue', 'kjøtt@hue.no', '789')}
        >Kjøtthue</MenuItem>
      <MenuItem eventKey='4' onClick={() => testUserLogin('Kjøtthue2', 'kjøtt2@hue.no', '7829')}>
        Kjøtthue2</MenuItem>
    </DropdownButton>
      : null

  const buttons = [loginButton, meButton, testUserSelection]

  return (
    <div>

      <MyHeader headline='Log in' />

      <div style={{background: 'white'}}>

        <Jumbotron className='jumbotron-mini' style={{background: 'white'}}>
          <Grid>
            <p>
              I am practicing making games and services that will require users to identify
              themselves. By logging in with facebook you do not have to worry about
              exposing your password.
            </p>
            <ButtonToolbar>{buttons}</ButtonToolbar>
            <p style={{height: '1em'}}><label>{displayMessage ? message : ''}</label></p>
            <p style={{marginTop: '5em'}}><small>Note: To change user you may have to go to facebook and log out from there.</small></p>

          </Grid>
        </Jumbotron>
      </div>
    </div>
  )
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  name: PropTypes.string,
  message: PropTypes.string,
  loading: PropTypes.bool
}

export default Login
