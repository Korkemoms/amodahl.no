import React, { PropTypes } from 'react'

import '../JumbotronMini.scss'
import '../App.scss'
import MyHeader from '../components/MyHeader'
import {LinkContainer} from 'react-router-bootstrap'

import {
  Grid,
  Jumbotron,
  Button,
  ButtonToolbar
} from 'react-bootstrap'

const Login = ({login, logout, token, loading, message, displayMessage}) => {
  let key = 1

  const loginButton = token === null
  ? <Button
    key={key++}
    bsStyle='primary'
    onClick={() => { login(false) }}
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

  const meButton = token !== null
  ? <LinkContainer to={{ pathname: '/me' }} key={key++}><Button
    bsStyle='primary'
    disabled={loading}>
      Details
    </Button></LinkContainer>
  : ''

  const buttons = [loginButton, meButton]

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
            <p><ButtonToolbar>{buttons}</ButtonToolbar></p>
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
  token: PropTypes.string,
  message: PropTypes.string,
  loading: PropTypes.bool
}

export default Login
