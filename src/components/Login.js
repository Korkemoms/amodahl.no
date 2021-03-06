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
  ButtonToolbar,
  DropdownButton,
  MenuItem
} from 'react-bootstrap'

/* Purely presentational component */
const Login = (props: {
  login: Function,
  logout: Function,
  user: ?Object,
  loading: ?boolean,
  message: ?string,
  displayMessage: ?boolean,
  history: Array<string>,
  push: Function
}) => {
  let key = 1
  let isLoggedIn = props.user !== null

  const googleButton = !isLoggedIn
  ? <Button
    key={key++}
    bsStyle='success'
    onClick={() => {
      props.login({
        type: 'google'
      })
    }}
    disabled={props.loading}>
    <i className='fa fa-google' aria-hidden='true' / > Log in with google
    </Button>
  : null

  const facebookButton = !isLoggedIn
  ? <Button
    key={key++}
    bsStyle='primary'
    onClick={() => {
      props.login({
        type: 'facebook'
      })
    }}
    disabled={props.loading}>
    <i className='fa fa-facebook' aria-hidden='true' /> Log in with facebook
    </Button>
  : null

  const logoutButton = isLoggedIn
    ? <Button
      key={key++}
      bsStyle='warning'
      onClick={() => { props.logout() }}
      disabled={props.loading}>
        Log out
      </Button>
      : null

  const meButton = isLoggedIn
  ? <LinkContainer to={{ pathname: '/me' }} key={key++}><Button
    bsStyle='primary'
    disabled={props.loading}>
      Details
    </Button></LinkContainer>
  : null

  // determine the 'last page' for the go-back button
  let lastPage: string = ''
  let ignorePages = ['/login', '/me', '/', '', '/signere-login']
  for (let i = props.history.length - 1; i >= 0; i--) {
    if (ignorePages.indexOf(props.history[i]) === -1) {
      lastPage = props.history[i]
      break
    }
  }

  const goBackButton = isLoggedIn && lastPage !== ''
    ? <Button key={key++} bsStyle='success' onClick={() => props.push(lastPage)} >
      {(lastPage: string).replace('/', '')}
    </Button>
    : null

  const showTestUserButton = !isLoggedIn // && process.env.NODE_ENV !== 'production'

  const testUserButton = showTestUserButton
    ? <DropdownButton key={key++} title='Test users'
      id='test-users' disabled={props.loading}>
      <MenuItem eventKey='2'
        onClick={() => props.login({
          type: 'test',
          name: "Gul'dan(Test)",
          email: 'guldan@hotmail.com'
        })}
        >Gul'dan(Test)
      </MenuItem>
      <MenuItem eventKey='3'
        onClick={() => props.login({
          type: 'test',
          name: 'Krosus(Test)',
          email: 'krosus@google.com'
        })}
        >Krosus(Test)
      </MenuItem>
      <MenuItem eventKey='4'
        onClick={() => props.login({
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
      props.login({
        type: 'signere',
        navigate: props.push
      })
    }}
    disabled={props.loading}>
        Log in with bank ID (test)
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

            <p style={{minHeight: '1em'}}><label>{props.displayMessage ? props.message : ''}</label></p>
            {experimentalButtonsToolbar}
            <p style={{marginTop: '5em'}}>
              <small>
                Read about the login implementation {' '}
                <a style={{cursor: 'pointer'}}
                  onClick={() => { props.push('amodahl-no') }}>here
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
