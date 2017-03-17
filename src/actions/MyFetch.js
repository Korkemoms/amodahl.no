import fetch from 'isomorphic-fetch'

// determine where to send requests
const www = window.location.href.indexOf('www.') !== -1 ? 'www.' : ''
const url = process.env.NODE_ENV === 'production'
  ? `https://${www}amodahl.no/api/public` : `http://${www}local.amodahl.no:3000`

/* The scopes to request for the token */
const scopes = [
  'user.all',
  'user.list',
  'chess-game.all',
  'chess-game.list',
  'chess-game.create',
  'chess-move.all',
  'chess-move.list',
  'chess-move.create',
  'update.all',
  'update.list'
]

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

/**
 * @callback onSuccess
 * @param {object} response The response body from the API
 */

/**
 * Ask the API for a token for one of the test users.
 * Valid test users are defined by the API.
 * @param dispatch The redux dispatch function
 * @param {string} name The test user name
 * @param {string} email The test user email
 * @param {string} mockFacebookId The test user (fake) facebook id
 * @param {string[]} scopes The scopes to request for the token
 * @param {onSuccess} onSuccess Callback when token is received
 */
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

/**
 * Ask the API for a token using a facebook token.
 * The API will checks that the facebook token is valid
 * and then responds with a JSON web token.
 *
 * @param dispatch The redux dispatch function
 * @param {string} fbAccessToken A valid facebook token
 * @param {string[]} scopes The scopes to request for the token
 * @param {onSuccess} onSuccess Callback when token is received
 */
function fetchJwToken (dispatch, fbAccessToken, scopes, onSuccess) {
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

/**
 * @callback tokenCallback
 * @param {string} token A JSON web token
 */

/**
 * Is ment to be called after logging in to facebook.
 * Will request a JSON web token from amodahl.no API, using the
 * facebook token as authorization
 *
 * @param dispatch The redux dispatch function
 * @param {Object} fbResponse The login response from the facebook API
 * @param {tokenCallback} tokenCallback Called when JSON web token is received from amodahl.no API
 */
function fbLoginCallback (dispatch, fbResponse, tokenCallback) {
  let fbAccessToken = fbResponse.authResponse.accessToken

  if (!fbResponse.authResponse) { // ensure facebook login was successful
    dispatch(requestTokenFailed('Failed to log in to facebook: ' + JSON.stringify(fbResponse), true))
    return
  }

  // fetch token from amodahl.no using facebook token
  fetchJwToken(dispatch, fbAccessToken, scopes,
    response => {
      // store user info in redux store
      dispatch(receiveTokenFromServer(response.token,
        response.user.name, response.user.email))

      // store user info in browser (for next time app is started)
      localStorage.setItem('jwToken', response.token)
      localStorage.setItem('name', response.user.name)
      localStorage.setItem('email', response.user.email)
      localStorage.setItem('mockFacebookId', null)
      localStorage.setItem('isTestUser', false)

      if (tokenCallback) {
        tokenCallback(fbResponse.token)
      }
    })
}

/**
 * @callback tokenCallback
 * @param {string} token A JSON web token
 */

// TODO refactor, this method is confusing
/**
 *
 * Try to log in as a test user, logging in means just getting a token, name and email.
 * Later, if the token is invalid (it often is when its from local storage)
 * this method can be called again with the server parameter true to get a new token
 * from the server.
 * @param {boolean} local Whether to try to get login info from local storage
 * @param {boolean} server Whether to try to get login info from server
 * @param {string} name Test user name, only used getting login info from server
 * @param {string} email Test user email, only used getting login info from server
 * @param {string} mockFacebookId Test user mockFacebookId, only used getting login info from server
 * @param {tokenCallback} tokenCallback Called when JSON web token is received from amodahl.no API
 */
export const testUserLogin = (local, server, name, email, mockFacebookId, tokenCallback) => dispatch => {
    // try to get info from local
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
    // try to get info from server
  dispatch(requestTokenFromServer())
  console.log(name, email, mockFacebookId)
  fetchTestUserJwtToken(dispatch, name, email, mockFacebookId, scopes,
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

        if (tokenCallback) {
          tokenCallback(response.token)
        }
      })
}

/**
 *
 * Try to log in as a test user, logging in means just getting a token, name and email.
 * Later, if the token is invalid (it often is when its from local storage)
 * this method can be called again with the server parameter true to get a new token
 * from the server.
 * @param {boolean} local Whether to try to get login info from local storage
 * @param {boolean} server Whether to try to get login info from server
 * @param {tokenCallback} tokenCallback Called when JSON web token is received from amodahl.no API
 */
export const login = (local, server, callback) => dispatch => {
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
  window.FB.login(fbResponse => {
    fbLoginCallback(dispatch, fbResponse, callback)
    console.info('Successfully logged in to facebook', fbResponse)
  }, {
    scope: 'public_profile,email'
  })
}

/**
 * @callback myFetchCallback
 * @param {Object} body The response body
 * @param {Object} header The response header
 */

 /**
  * @function myFetch
  * @param {string} what The url describing what to fetch
  * @param {Object} props Additional fetch properties
  * @param {myFetchCallback} what Called after successfully fetching resource
  */

/**
 * Method for fetching resources from amodahl.no API.
 * If request fails because of expired token a login action is dispatched and
 * the fetch request is repeated after successfull login.
 * @param dispatch The redux dispatch function
 * @param {string} jwToken a token for amodahl.no API
 * @param {number} attempts Number fetch attempts for 'what'
 * @param {string} what The url describing what to fetch
 * @param {Object} props Additional fetch properties
 * @param {myFetchCallback} what Called after successfully fetching resource
 *
 * Uses callback instead of .then because
 * I could not figure out how to
 * pass both body and headers otherwise.
 */
export const myFetch = dispatch => (jwToken, attempts = 0) => (what, props, myFetchCallback) => {
  var headers = props.headers ? props.headers : new Headers()
  headers.append('Authorization', 'Bearer ' + jwToken)
  headers.append('pragma', 'no-cache')
  headers.append('cache-control', 'no-store')

  const properties = {
    headers: headers,
    ...props
  }

  return fetch(url + what, properties)
    .then(response => {
      // ensure its json
      let contentType = response.headers.get('content-type')
      let gotJson = contentType && contentType.indexOf('application/json') !== -1
      if (!gotJson) {
        throw new Error('Oops, we haven\'t got JSON: ' + JSON.stringify(response))
      }
      return response.json().then(json => {
        // check if token has expired
        if (json.status === 'error' && json.message === 'Expired token') {
          // try to get new token and then repeat fetch
          if (attempts < 2) {
            let callback = (newToken) =>
              myFetch(newToken, dispatch, attempts + 1)(what, props, callback)

            if (localStorage.isTestUser === true && localStorage.jwToken &&
              localStorage.name && localStorage.email) {
              dispatch(testUserLogin(false, true, localStorage.name,
                localStorage.email, localStorage.name, callback))
            } else {
              dispatch(login(false, true, callback))
            }
            throw new Error('Token expired')
          }
          throw new Error('Token expired, no more relog attempts')
        }

        // ensure query was accepted
        if (json.status && json.status !== 'ok') {
          throw new Error('Received: ' + JSON.stringify(json))
        }
        if (myFetchCallback) {
          myFetchCallback(json, response.headers)
        }
      })
    })
}

/**
 * Clears local storage and dispatches an action to tell
 * other components that user has logged out.
 * @param {string} dispatcher Identifies from which page user clicked log out
 */
export const logout = (dispatcher) => dispatch => {
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
