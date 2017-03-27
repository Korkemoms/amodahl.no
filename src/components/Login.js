import React from 'react'

import '../MyContent.scss'
import '../App.scss'
import MyHeader from '../components/MyHeader'
import {LinkContainer} from 'react-router-bootstrap'
import DocumentTitle from 'react-document-title'

import {
  Grid,
  Button,
  ButtonToolbar,
  DropdownButton,
  MenuItem
} from 'react-bootstrap'

/* Purely presentational component */
const Login = ({login, logout, user, loading, message,
                    displayMessage, history, navigate}) => {
  let key = 1
  let isLoggedIn = user !== null

  const googleButton = !isLoggedIn
  ? <Button
    key={key++}
    bsStyle='success'
    onClick={() => {
      login({
        type: 'google'
      })
    }}
    disabled={loading}>
    <i className='fa fa-google' aria-hidden='true' / > Log in with google
    </Button>
  : null

  const facebookButton = !isLoggedIn
  ? <Button
    key={key++}
    bsStyle='primary'
    onClick={() => {
      login({
        type: 'facebook'
      })
    }}
    disabled={loading}>
    <i className='fa fa-facebook' aria-hidden='true' /> Log in with facebook
    </Button>
  : null

  const logoutButton = isLoggedIn
    ? <Button
      key={key++}
      bsStyle='warning'
      onClick={() => { logout() }}
      disabled={loading}>
        Log out
      </Button>
      : null

  const meButton = isLoggedIn
  ? <LinkContainer to={{ pathname: '/me' }} key={key++}><Button
    bsStyle='primary'
    disabled={loading}>
      Details
    </Button></LinkContainer>
  : null

  // determine the 'last page' for the go-back button
  let lastPage = null
  let ignorePages = ['/login', '/me', '/', '']
  for (let i = history.length - 1; i >= 0; i--) {
    if (ignorePages.indexOf(history[i]) === -1) {
      lastPage = history[i]
      break
    }
  }

  const goBackButton = isLoggedIn && lastPage !== null
    ? <Button key={key++} bsStyle='success' onClick={() => navigate(lastPage)} >
      {lastPage.replace('/', '')}
    </Button>
    : null

  const showTestUserButton = !isLoggedIn // && process.env.NODE_ENV !== 'production'

  const testUserButton = showTestUserButton
    ? <DropdownButton key={key++} title='Test users' id='test-users'>
      <MenuItem eventKey='2'
        onClick={() => login({
          type: 'test',
          name: "Gul'dan(Test)",
          email: 'guldan@hotmail.com'
        })}
        >Gul'dan(Test)
      </MenuItem>
      <MenuItem eventKey='3'
        onClick={() => login({
          type: 'test',
          name: 'Krosus(Test)',
          email: 'krosus@google.com'
        })}
        >Krosus(Test)
      </MenuItem>
      <MenuItem eventKey='4'
        onClick={() => login({
          type: 'test',
          name: 'Elisande(Test)',
          email: 'elisande@amazon.com'
        })}
          >Elisande(Test)
      </MenuItem>
    </DropdownButton>
      : null

  const buttons = [
    facebookButton,
    googleButton,
    logoutButton,
    meButton,
    testUserButton,
    goBackButton
  ]

  const signereButton = !isLoggedIn
  ? <Button
    key={key++}
    bsStyle='warning'
    onClick={() => {
      login({
        type: 'signere',
        navigate: navigate
      })
    }}
    disabled={loading}>
        Log in with Signere
      </Button>
  : null

  const experimentalButtons = [signereButton]
  const experimentalButtonsToolbar = !isLoggedIn
  ? <div>
    <p style={{marginTop: '3em'}}>Experimental: </p>
    <ButtonToolbar>{experimentalButtons}</ButtonToolbar>
  </div>
    : null

  return (
    <DocumentTitle title='Log in'>
      <div>

        <MyHeader headline='Log in' />

        <div className='mycontent'>
          <Grid>
            <p>
              Logging in with facebook or google is fast, safe and easy.
            </p>
            <ButtonToolbar>{buttons}</ButtonToolbar>

            <p style={{minHeight: '1em'}}><label>{displayMessage ? message : ''}</label></p>
            {experimentalButtonsToolbar}
            <p style={{marginTop: '5em'}}>
              <small>
                Read about the login implementation {' '}
                <a style={{cursor: 'pointer'}}
                  onClick={() => { navigate('amodahl-no') }}>here
                </a>.
                <br />
                Note: To change user you may
                have to go to facebook/google and log out from there.
              </small>
            </p>
          </Grid>
        </div>
      </div>
    </DocumentTitle>
  )
}

export default Login
