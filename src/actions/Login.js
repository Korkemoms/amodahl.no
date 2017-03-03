import fetch from 'isomorphic-fetch'

// determine where to send requests
const www = window.location.href.indexOf('www.') !== -1 ? 'www.' : ''
const url = process.env.NODE_ENV === 'production' ?
  `http://${www}amodahl.no/api/public` : `http://${www}local.amodahl.no`

export const requestTokenFromLocalStorage = () => {
  return {
    type: 'REQUEST_TOKEN_FROM_LOCAL_STORAGE'
  }
}

export const requestTokenFromServer = () => {
  return {
    type: 'REQUEST_TOKEN_FROM_SERVER'
  }
}

export const requestTokenFailed = (message, displayMessage) => {
  return {
    message: message,
    displayMessage: displayMessage,
    token: null,
    type: 'REQUEST_TOKEN_FAILED'
  }
}

export const deleteToken = (dispatcher) => {
  return {
    token: null,
    type: '@@' + dispatcher + '/DELETE_TOKEN'
  }
}

export const receiveTokenFromServer = (token, name, email) => {
  return {
    token: token,
    name: name,
    email: email,
    type: 'RECEIVE_TOKEN_FROM_SERVER'
  }
}

export const receiveTokenFromLocalStorage = (token, name, email) => {
  return {
    token: token,
    name: name,
    email: email,
    type: 'RECEIVE_TOKEN_FROM_LOCAL_STORAGE'
  }
}

function fetchJwtToken (dispatch, fbAccessToken, scopes, onSuccess) {
  var form = new FormData()
  form.append('fb_access_token', fbAccessToken)
  form.append('requested_scopes', JSON.stringify(scopes))

  fetch(url + '/token', {
    method: 'POST',
    body: form
  })
  .then(response => { // ensure its json
    let contentType = response.headers.get('content-type')
    let gotJson = contentType && contentType.indexOf('application/json') !== -1

    if (!gotJson) {
      throw new Error('Oops, we haven\'t got JSON: ' + JSON.stringify(response))
    }
    return response.json()
  })
  .then(response => { // ensure query was accepted
    let ok = response.status === 'ok'

    if (!ok) {
      throw new Error('Received: ' + JSON.stringify(response))
    }

    // finally got token
    onSuccess(response)
  })
  .catch(error => { // all errors are handled here
    dispatch(requestTokenFailed('Something went wrong: ' + error, true))
  })
}

function fbLoginCallback (dispatch, response) {
  let fbAccessToken = response.authResponse.accessToken

  if (!response.authResponse) { // ensure facebook login was successful
    dispatch(requestTokenFailed('Failed to log in to facebook: ' + JSON.stringify(response), true))
    return
  }

  fetchJwtToken(dispatch, fbAccessToken, ['user.list', 'user.all'],
    response => {
      let action = receiveTokenFromServer(response.token,
        response.user.name, response.user.email)
      dispatch(action)

      // store user info in browser
      localStorage.setItem('token', response.token)
      localStorage.setItem('name', response.user.name)
      localStorage.setItem('email', response.user.email)
    })
}

export const login = (onlySearchLocalStorage) => {
  return (dispatch) => {
    dispatch(requestTokenFromLocalStorage())
    if (localStorage.token && localStorage.name && localStorage.email) {
      let action = receiveTokenFromLocalStorage(localStorage.token,
        localStorage.name, localStorage.email)
      dispatch(action)
      return
    }
    let action = requestTokenFailed('No login info found in local storage', false)
    dispatch(action)

    if (onlySearchLocalStorage) {
      return
    }

    dispatch(requestTokenFromServer())
    // log in with facebook
    console.info('Begin facebook login')
    window.FB.login(response => {
      fbLoginCallback(dispatch, response)
      console.info('Successfully logged in to facebook', response)
    }, {
      scope: 'public_profile,email'
    })
  }
}

export const logout = (dispatcher) => {
  return (dispatch) => {
    dispatch(deleteToken(dispatcher))
    localStorage.clear()

    // log out of facebook
    console.info('Begin facebook logout')
    try {
      window.FB.logout((response) => {
        console.info('Successfully logged out of facebook', response)
      })
    } catch (err) {
      console.info('There was a problem logging out of facebook', err)
    }
  }
}
