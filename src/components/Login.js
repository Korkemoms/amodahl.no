import React from 'react'

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

const Login = ({login, testUserLogin, logout, name,
  loading, message, displayMessage, history, navigate}) => {
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
  : null

  let lastPage = null
  let ignorePages = [
    '/login',
    '/me'
  ]

  for (let i = history.length - 1; i >= 0; i--) {
    if (ignorePages.indexOf(history[i]) === -1) {
      lastPage = history[i]
      break
    }
  }

  const goBackButton = name !== null && lastPage !== null
    ? <Button key={key++} bsStyle='success' onClick={() => navigate(lastPage)} >{lastPage}</Button>
    : null

  const showTestUserButton = name === null  // && process.env.NODE_ENV !== 'production'

  const testUserSelection = showTestUserButton
    ? <DropdownButton key={key++} title='Test Users' id='test-users'>
      <MenuItem eventKey='2' onClick={() => testUserLogin("Gul'dan(Test)", 'guldan@hotmail.com', '123')}
        >Gul'dan(Test)</MenuItem>
      <MenuItem eventKey='3' onClick={() => testUserLogin('Krosus(Test)', 'krosus@google.com', '456')}
        >Krosus(Test)</MenuItem>
      <MenuItem eventKey='4' onClick={() => testUserLogin('Elisande(Test)', 'elisande@amazon.com', '789')}>
        Elisande(Test)</MenuItem>
    </DropdownButton>
      : null

  const buttons = [loginButton, meButton, testUserSelection, goBackButton]

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

export default Login
