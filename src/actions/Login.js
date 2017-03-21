import fetch from 'isomorphic-fetch'

// import initializer, {CreateIdentificationRequest} from 'IdentiSignIdentification'

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

export const requestTokenFromGoogle = params => {
  return {
    type: 'REQUEST_TOKEN_FROM_GOOGLE',
    params: params
  }
}

export const requestTokenFromFacebook = params => {
  return {
    type: 'REQUEST_TOKEN_FROM_FACEBOOK',
    params: params
  }
}

export const requestTokenFromSignere = params => {
  return {
    type: 'REQUEST_TOKEN_FROM_SIGNERE',
    params: params
  }
}

export const requestTokenFromAmodahl = params => {
  return {
    type: 'REQUEST_TOKEN_FROM_AMODAHL',
    params: params
  }
}

export const requestTokenFromLocalStorage = params => {
  return {
    type: 'REQUEST_TOKEN_FROM_LOCAL_STORAGE',
    params: params
  }
}

export const receiveTokenFromFacebook = params => {
  return {
    type: 'RECEIVE_TOKEN_FROM_FACEBOOK',
    params: params
  }
}

export const receiveTokenFromGoogle = params => {
  return {
    type: 'RECEIVE_TOKEN_FROM_GOOGLE',
    params: params
  }
}

export const receiveTokenFromSignere = params => {
  return {
    type: 'RECEIVE_TOKEN_FROM_SIGNERE',
    params: params
  }
}

export const receiveTokenFromAmodahl = (jwToken, name, email) => {
  return {
    jwToken: jwToken,
    name: name,
    email: email,
    type: 'RECEIVE_TOKEN_FROM_AMODAHL'
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
function fetchJwToken (dispatch, params, callback) {
  dispatch(requestTokenFromAmodahl(params))
  if (!callback) {
    callback = () => {}
  }
  // prepare body
  var form = new FormData()
  form.append('requested_scopes', JSON.stringify(scopes))
  if (params.fbAccessToken) {
    form.append('fb_access_token', params.fbAccessToken)
  }
  if (params.googleIdToken) {
    form.append('google_id_token', params.googleIdToken)
  }
  if (params.name) {
    form.append('name', params.name)
  }
  if (params.email) {
    form.append('email', params.email)
  }
  if (params.mockFacebookId) {
    form.append('mock_facebook_id', params.mockFacebookId)
  }
  if (params.type) {
    form.append('type', params.type)
  }

  return fetch(url + '/token', {
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
    return response
  }).then(response => {
    dispatch(receiveTokenFromAmodahl(response.token,
      response.user.name, response.user.email))

    // store user info in browser (for next time app is started)
    localStorage.setItem('loginType', params.type)
    localStorage.setItem('jwToken', response.token)
    localStorage.setItem('name', response.user.name)
    localStorage.setItem('email', response.user.email)

    callback(response.token)
  })
  .catch(error => {
    dispatch(requestTokenFailed(error, true))
  })
}

export const login = (params, callback) => dispatch => {
  if (!params) {
    // use same login type as last time
    params = {
      type: localStorage.loginType
    }
  }
  if (!callback) {
    callback = () => {}
  }

  // try offline login
  dispatch(requestTokenFromLocalStorage(params))
  if (localStorage.loginType && localStorage.loginType === params.type) {
    dispatch(receiveTokenFromLocalStorage(localStorage.jwToken,
          localStorage.name, localStorage.email))

    callback(localStorage.jwToken)

    return
  }
  dispatch(requestTokenFailed(`No ${params.type} login info found in local storage`, false))

  if (params.type === 'google') {
    dispatch(requestTokenFromGoogle(params))

    const signInGoogle = () => {
      window.gapi.auth2.getAuthInstance().signIn().then(result => {
        dispatch(receiveTokenFromGoogle(result.Zi.id_token))
        fetchJwToken(dispatch, {
          ...params,
          googleIdToken: result.Zi.id_token
        }, callback)
      })
    }

    window.signinCallback = () => {
      window.gapi.load('auth2', () => {
        window.gapi.auth2.init({
          client_id: '778219340101-tf221dbeeho9frka8js86iv460hfuse0.apps.googleusercontent.com'
        })
        window.gapi.auth2.getAuthInstance().isSignedIn.listen(signInGoogle)

        // dispatch(requestTokenFailed('Failed to log in to google: '
        //    + JSON.stringify(error), true))
      })
    }

    if (window.gapi) {
      signInGoogle()
    } else { // init google sdk first
      var jsElm = document.createElement('script')
      jsElm.type = 'application/javascript'
      jsElm.src = 'https://apis.google.com/js/platform.js?onload=signinCallback'
      jsElm.id = 'google-lib'
      document.body.appendChild(jsElm)
    }
  }

  if (params.type === 'signere') {
    dispatch(requestTokenFromSignere(params))
    dispatch(requestTokenFailed('Signere not supported yet', true))
  }

  if (params.type === 'facebook') {
    dispatch(requestTokenFromFacebook())

    // to be called after init facebook sdk
    const fbLogin = () => {
      window.FB.login(fbResponse => {
        if (!fbResponse.authResponse) { // ensure facebook login was successful
          dispatch(requestTokenFailed('Failed to log in to facebook: ' + JSON.stringify(fbResponse), true))
          return
        }

        dispatch(receiveTokenFromFacebook(fbResponse.authResponse))

        let fbAccessToken = fbResponse.authResponse.accessToken
        // fetch token from amodahl.no using facebook token

        fetchJwToken(dispatch, {
          ...params,
          fbAccessToken: fbAccessToken
        }, callback)
      }, {scope: 'public_profile,email'})
    }

    if (document.getElementById('facebook-jssdk')) {
      fbLogin()
    } else { // init facebook sdk first
      window.fbAsyncInit = function () {
        window.FB.init({
          appId: '772463112910269',
          xfbml: true,
          version: 'v2.8'
        })
        window.FB.AppEvents.logPageView()

        fbLogin()
      };

      (function (d, s, id) {
        let js
        let fjs = d.getElementsByTagName(s)[0]
        if (d.getElementById(id)) { return }
        js = d.createElement(s); js.id = id
        js.src = '//connect.facebook.net/en_US/sdk.js'
        fjs.parentNode.insertBefore(js, fjs)
      }(document, 'script', 'facebook-jssdk'))
    }
  }

  if (params.type === 'test') {
    fetchJwToken(dispatch, params, callback)
  }
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

            dispatch(login({
              type: localStorage.loginType
            }, callback))

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
  try {
    if (window.FB) {
      window.FB.logout((response) => {
        console.info('Successfully logged out of facebook', response)
      })
    }
  } catch (err) {
    console.info('There was a problem logging out of facebook', err)
  }

  // TODO log out google
}
