import fetch from 'isomorphic-fetch'
import { types } from '../constants/ActionTypes'

// determine where to send requests
const url = () => {
  const www = window.location.href.indexOf('www.') !== -1 ? 'www.' : ''
  return process.env.NODE_ENV === 'production'
    ? `https://${www}amodahl.no/api/public` : `http://${www}local.amodahl.no:3000`
}

const googleClientId = '778219340101-tf221dbeeho9frka8js86iv460hfuse0.apps.googleusercontent.com'

// The scopes to request for the token
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

export const receiveAmodahlToken = (jwToken, user) => ({
  jwToken: jwToken,
  user: user,
  type: types.login.RECEIVE_AMODAHL_TOKEN
})

export const receiveSignereUrl = (url, accessToken, requestId) => ({
  type: types.login.RECEIVE_SIGNERE_URL,
  url: url,
  accessToken: accessToken,
  requestId: requestId
})

export const requestAmodahlTokenFailed = () => ({
  type: types.login.REQUEST_AMODAHL_TOKEN_FAILED
})

export const userLoggedOut = () => ({
  type: types.login.USER_LOGGED_OUT
})

export const updateLoginInfo = (message, displayMsg, loading, info, cancelled) => ({
  message: message,
  displayMessage: displayMsg,
  loading: loading,
  additionalInfo: info,
  cancelled: cancelled,
  type: types.login.UPDATE_LOGIN_INFO
})

/**
 * Ask the API for a token using a facebook or google token, or a
 * signere request id.
 * The API checks that the token or id is valid
 * and then responds with a JSON web token.
 *
 * @param params Login parameters
 * @param params.fbAccessToken a facebook access token (facebook)
 * @param params.googleIdToken a google id token (google)
 * @param params.signereRequestId a signere.no request id (signere)
 * @param params.signereAccessToken a signere.no OAuth2 access token (signere, optional)
 * @param params.name the users name (test)
 * @param params.email the users email (test)
 * @param params.type the type of login (test/signere/google/facebook)
 *
 * @return the API's response containing a JSON web token for amodahl.no-api
 */
export const fetchJwToken = params => (dispatch, getState) => {
  dispatch(updateLoginInfo('Logging in to amodahl.no...', true, true, params, false))
  let state = getState()

  params = {
    ...params,
    requestedScopes: JSON.stringify(scopes)
  }

  var headers = new Headers()
  headers.append('pragma', 'no-cache')
  headers.append('cache-control', 'no-cache')

  return fetch(url() + '/token', {
    method: 'POST',
    headers,
    body: JSON.stringify(params)
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
    if (response.status !== 'ok') {
      throw new Error('Received: ' + JSON.stringify(response))
    }
    return response
  })
  .then(response => { // ensure we got what we wanted
    if (!response.user || !response.user.name || !response.user.uid || !response.token) {
      throw new Error('Received: ' + JSON.stringify(response))
    }
    if (typeof (response.user.name) !== 'string' ||
        typeof (response.user.uid) !== 'string' ||
        typeof (response.token) !== 'string') {
      throw new Error('Received: ' + JSON.stringify(response))
    }
    if (response.user.name.length === 0 ||
        response.user.uid.length === 0 ||
        response.token.length === 0) {
      throw new Error('Received: ' + JSON.stringify(response))
    }

    return response
  })
  .then(response => {
    if (!state.cancelled) {
      dispatch(receiveAmodahlToken(response.token, response.user))
      dispatch(updateLoginInfo('You logged in as ' + response.user.name,
            true, false, response, false))

        // store user info in browser (for next time app is started)
      localStorage.setItem('loginType', params.type)
      localStorage.setItem('jwToken', response.token)
      localStorage.setItem('user', JSON.stringify(response.user))
    }
  })
  .catch(error => {
    if (!state.cancelled) {
      dispatch(requestAmodahlTokenFailed())
      dispatch(updateLoginInfo('Failed to log in to amodahl.no: ' +
        error.message, true, false, error, false))
    }
  })
}

/**
 * Log in to amodahl.no-api.
 * This means authenticating with (google/facebook/signere)
 * and then requesting an amodahl.no-api token using the token/requestId
 * from (google/facebook/signere).
 *
 * In addition test users defined by the API can log
 * without further identification.
 * @param params Login parameters
 * @param params.signereRequestId a signere.no request id (signere)
 * @param params.signereAccessToken a signere.no OAuth2 access token (signere, optional)
 * @param params.name the users name (test)
 * @param params.email the users email (test)
 * @param params.type the type of login (test/signere/google/facebook)
 */
export const login = params => (dispatch, getState) => {
  if (!params) {
    // use same login type as last time
    params = {
      type: localStorage.loginType
    }
  }

  let state = getState()

  // try offline login
  dispatch(updateLoginInfo('Looking for user info in local storage...',
    false, false, params, false))
  if (localStorage.loginType && localStorage.loginType === params.type) {
    let user
    try {
      user = JSON.parse(localStorage.user)
      dispatch(receiveAmodahlToken(localStorage.jwToken, user))
      dispatch(updateLoginInfo('You logged in as ' + user.name,
        true, false, user, false))
      return
    } catch (e) {
      dispatch(updateLoginInfo(`Invalid login info found in local storage, clearing`,
        false, false, localStorage, false))
      localStorage.clear()
    }
  } else {
    dispatch(updateLoginInfo(`No ${params.type} login info found in local storage`,
      false, false, localStorage, false))
  }

  if (params.type === 'signere' && params.signereRequestId) {
    dispatch(fetchJwToken(params))
  } else if (params.type === 'signere') {
    dispatch(updateLoginInfo('Requesting url from Signere.no',
      true, true, params, false))

    // get url for iframe
    let body = {
      requested_scopes: JSON.stringify(scopes),
      type: 'signere'
    }

    fetch(url() + '/token', {
      method: 'POST',
      body: JSON.stringify(body)
    })
    .then(response => { // ensure its json
      let contentType = response.headers.get('content-type')
      let gotJson = contentType && contentType.indexOf('application/json') !== -1

      if (!gotJson) {
        throw new Error('Oops, we haven\'t got JSON: ' + JSON.stringify(response))
      }
      return response.json()
    })
    .then(result => {
      if (!state.cancelled) {
        dispatch(updateLoginInfo('Received url from Signere.no',
              true, true, result, false))
        dispatch(receiveSignereUrl(result.Url, result.AccessToken, result.RequestId))
        params.navigate('/signere-login')
      }
    })
  }

  if (params.type === 'google') {
    dispatch(updateLoginInfo('Logging in with Google...',
      true, true, params, false))

    const errorCallback = error => {
      if (!state.cancelled) {
        dispatch(updateLoginInfo('Failed to log in to google: ' +
              JSON.stringify(error), true, false, error, false))
      }
    }

    window.signinCallback = () => {
      console.log('Signing in with google')

      // TODO improve
      window.gapi.load('auth2', function () {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        window.gapi.auth2.init({
          client_id: googleClientId,
          cookiepolicy: 'single_host_origin'
        })
        .then(args => {
          window.gapi.auth2.getAuthInstance()
          .then(googleAuth => {
            googleAuth.signIn()
            .then(result => {
              let authResponse = googleAuth.currentUser.get()
                                  .getAuthResponse(true)
              if (!state.cancelled) {
                // finally we got google token and can trade it for an amodahl token
                dispatch(updateLoginInfo('Received token from Google',
                                      true, true, authResponse, false))
                dispatch(fetchJwToken({
                  googleIdToken: authResponse.id_token,
                  ...params
                }))
              }
            }, errorCallback) // asdf
          }, errorCallback) //
        }, errorCallback)
      })
    }

    if (window.document.getElementById('google-lib')) {
      window.signinCallback()
    } else {
      // init google sdk first
      console.log('Initializing google sdk')
      var jsElm = window.document.createElement('script')
      jsElm.type = 'application/javascript'
      jsElm.src = 'https://apis.google.com/js/client.js?onload=signinCallback'
      jsElm.id = 'google-lib'
      window.document.body.appendChild(jsElm)
    }
  }

  if (params.type === 'facebook') {
    dispatch(updateLoginInfo('Logging in with Facebook...',
      true, true, params, false))

    // to be called after init facebook sdk
    const fbLogin = () => {
      window.FB.login(fbResponse => {
        if (!fbResponse.authResponse) { // ensure facebook login was successful
          dispatch(updateLoginInfo('Failed to log in to facebook: ' +
            JSON.stringify(fbResponse), true, false, fbResponse, false))
          return
        }

        let fbAccessToken = fbResponse.authResponse.accessToken

        if (!state.cancelled) {
          dispatch(updateLoginInfo('Received token from Facebook',
            true, true, fbResponse.authResponse, false))
          // fetch token from amodahl.no using facebook token
          dispatch(fetchJwToken({
            ...params,
            fbAccessToken: fbAccessToken
          }))
        }
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
    dispatch(fetchJwToken(params))
  }
}

/**
 * @callback MyFetchCallback
 * @param {Object} body The response body
 * @param {Object} header The response header
 */

/**
 * Method for fetching resources from amodahl.no API.
 * If request fails because of expired token a login action is dispatched and
 * the fetch request is repeated after successfull login.
 * @param dispatch The redux dispatch function
 * @param jwToken a token for amodahl.no API
 * @param attempts Number fetch attempts for 'what'
 * @param what The url describing what to fetch
 * @param params Additional fetch parameters
 * @param callback {MyFetchCallback} called when resource has been fetched
 *
 * @return promise that is resolved with headers and body of API response
 */
export const myFetch = dispatch => jwToken => (path, params) => {
  var headers = params.headers ? params.headers : new Headers()
  headers.append('Authorization', 'Bearer ' + jwToken)
  headers.append('pragma', 'no-cache')
  headers.append('cache-control', 'no-store')

  const properties = {
    headers: headers,
    ...params
  }

  return fetch(url() + path, properties)
  .then(response => {
    // ensure its json
    let contentType = response.headers.get('content-type')
    let gotJson = contentType && contentType.indexOf('application/json') !== -1
    if (!gotJson) {
      throw new Error('Oops, we haven\'t got JSON: ' + JSON.stringify(response))
    }
    return response.json().then(json =>
    ({ headers: headers, body: json }))
  })
  .then(({body, headers}) => {
    // check if token has expired
    if (body.status === 'error' && body.message === 'Expired token') {
      // TODO deal with it
      throw new Error('Token expired')
    }
    return ({body, headers})
  })
  .then(({body, headers}) => {
    // ensure query was accepted
    if (body.status && body.status !== 'ok') {
      throw new Error('Received: ' + JSON.stringify(body))
    }
    return ({body, headers})
  })
}

/**
 * Clear local storage and dispatch an action to tell
 * other components that user has logged out.
 * @param {string} dispatcher From which page user clicked log out
 */
export const logout = () => dispatch => {
  dispatch(userLoggedOut())
  localStorage.clear()

  // log out of facebook
  try {
    if (window.FB) {
      window.FB.logout((response) => {
        console.log('Successfully logged out of facebook', response)
      })
    }
  } catch (err) {
    console.log('There was a problem logging out of facebook', err)
  }

  // TODO log out with google sdk?
}
