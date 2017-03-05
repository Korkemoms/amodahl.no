import fetch from 'isomorphic-fetch'

// determine where to send requests
const www = window.location.href.indexOf('www.') !== -1 ? 'www.' : ''
const url = process.env.NODE_ENV === 'production'
  ? `http://${www}amodahl.no/api/public` : `http://${www}local.amodahl.no:3000`

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
    jwToken: null,
    type: 'REQUEST_TOKEN_FAILED'
  }
}

export const deleteToken = (dispatcher) => {
  return {
    jwToken: null,
    type: '@@' + dispatcher + '/DELETE_TOKEN'
  }
}

export const receiveTokenFromServer = (jwToken, name, email) => {
  return {
    jwToken: jwToken,
    name: name,
    email: email,
    type: 'RECEIVE_TOKEN_FROM_SERVER'
  }
}

export const receiveTokenFromLocalStorage = (jwToken, name, email) => {
  return {
    jwToken: jwToken,
    name: name,
    email: email,
    type: 'RECEIVE_TOKEN_FROM_LOCAL_STORAGE'
  }
}

function fetchTestUserJwtToken (dispatch, name, email, mockFacebookId, scopes, onSuccess) {
  var form = new FormData()
  form.append('requested_scopes', JSON.stringify(scopes))
  form.append('name', name)
  form.append('email', email)
  form.append('mock_facebook_id', mockFacebookId)

  fetch(url + '/token', {
    method: 'POST',
    body: form
  })
  .then(response => { // ensure its json
    let contentType = response.headers.get('content-type')
    let gotJson = contentType && contentType.indexOf('application/json') !== -1
    console.log(response)
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

function fbLoginCallback (dispatch, response, callback) {
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
      localStorage.setItem('jwToken', response.token)
      localStorage.setItem('name', response.user.name)
      localStorage.setItem('email', response.user.email)
      localStorage.setItem('mockFacebookId', null)
      localStorage.setItem('isTestUser', false)

      if (callback) {
        callback()
      }
    })
}

export const testUserLogin = (local, server, name, email, mockFacebookId, callback) => {
  return (dispatch) => {
    // try to get from local
    if (local) {
      dispatch(requestTokenFromLocalStorage())
      if (localStorage.jwToken && localStorage.name && localStorage.email) {
        let action = receiveTokenFromLocalStorage(localStorage.jwToken,
          localStorage.name, localStorage.email)
        dispatch(action)
        return
      }
      let action = requestTokenFailed('No login info found in local storage', false)
      dispatch(action)
    }

    if (!server) {
      return
    }
    // try to get from server
    dispatch(requestTokenFromServer())
    fetchTestUserJwtToken(dispatch, name, email, mockFacebookId, ['user.list', 'user.all'],
      response => {
        let action = receiveTokenFromServer(response.token,
          response.user.name, response.user.email)
        dispatch(action)

        // store user info in browser
        localStorage.setItem('jwToken', response.token)
        localStorage.setItem('name', response.user.name)
        localStorage.setItem('email', response.user.email)
        localStorage.setItem('mockFacebookId', mockFacebookId)
        localStorage.setItem('isTestUser', true)

        if (callback) {
          callback()
        }
      })
  }
}

export const login = (local, server, callback) => {
  return (dispatch) => {
    // try to get from local
    if (local) {
      dispatch(requestTokenFromLocalStorage())
      if (localStorage.jwToken && localStorage.name && localStorage.email) {
        let action = receiveTokenFromLocalStorage(localStorage.jwToken,
        localStorage.name, localStorage.email)
        dispatch(action)
        if (callback) {
          callback()
        }
        return
      }
      dispatch(requestTokenFailed('No login info found in local storage', false))
    }

    if (!server) {
      return
    }

          // try to get from server
    dispatch(requestTokenFromServer())
          // log in with facebook
    console.info('Begin facebook login')
    window.FB.login(response => {
      fbLoginCallback(dispatch, response, callback)
      console.info('Successfully logged in to facebook', response)
    }, {
      scope: 'public_profile,email'
    })
  }
}

export const myFetch = (jwToken, dispatch, attempts = 0) => {
  return (what, props) => {
    var headers = new Headers()
    headers.append('Authorization', 'Bearer ' + jwToken)

    const properties = {
      headers: headers,
      ...props
    }

    return fetch(url + what, properties)
    .then(response => { // ensure its json
      let contentType = response.headers.get('content-type')
      let gotJson = contentType && contentType.indexOf('application/json') !== -1

      if (!gotJson) {
        throw new Error('Oops, we haven\'t got JSON: ' + JSON.stringify(response))
      }
      return response.json()
    })
    .then(response => { // check if token has expired
      if (response.status === 'error' && response.message === 'Expired token') {
        // try to get new token and then repeat fetch
        if (attempts < 2) {
          let callback = () => myFetch(jwToken, dispatch, attempts++)(what, props)
          if (localStorage.isTestUser === true && localStorage.jwToken
            && localStorage.name && localStorage.email) {
            dispatch(testUserLogin(false, true, localStorage.name, localStorage.email, localStorage.name, callback))
          } else {
            dispatch(login(false, true, callback))
          }

          throw new Error('Token expired')
        }

        throw new Error('Token expired, no more relog attempts')
      }
      return response
    })
    .then(response => { // ensure query was accepted
      if (response.status && response.status !== 'ok') {
        throw new Error('Received: ' + JSON.stringify(response))
      }
      return response
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
