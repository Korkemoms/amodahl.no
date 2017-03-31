// @flow
import fetch from 'isomorphic-fetch'
import { push } from 'react-router-redux'
import type { Action, LoginParams } from './Types'

// determine where to send requests
const url = (): string => {
  const www = (typeof(window) !== 'undefined' ? window.location.href.indexOf('www.') : -1) !== -1 ? 'www.' : ''
  return process.env.NODE_ENV === 'production'
    ? `https://${www}amodahl.no/api/public`
    : `http://${www}local.amodahl.no:3000`
}

const googleClientId = '778219340101-tf221dbeeho9frka8js86iv460hfuse0' +
                        '.apps.googleusercontent.com'

const fbAppId = '772463112910269'

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

export const requestAmodahlToken = (): Action => ({
  type: 'REQUEST_AMODAHL_TOKEN'
})

export const receiveAmodahlToken = (
  jwToken: string,
  user: Object): Action => ({
    type: 'RECEIVE_AMODAHL_TOKEN',
    jwToken: jwToken,
    user: user
  })

export const requestAmodahlTokenFailed = (): Action => ({
  type: 'REQUEST_AMODAHL_TOKEN_FAILED'
})

export const requestFbToken = (): Action => ({
  type: 'REQUEST_FB_TOKEN'
})

export const receiveFbToken = (): Action => ({
  type: 'RECEIVE_FB_TOKEN'
})

export const requestFbTokenFailed = (): Action => ({
  type: 'REQUEST_FB_TOKEN_FAILED'
})

export const receiveSignereUrl = (
  url: string,
  accessToken: string,
  requestId: string): Action => ({
    type: 'RECEIVE_SIGNERE_URL',
    url: url,
    accessToken: accessToken,
    requestId: requestId
  })

export const userLoggedOut = (): Action => ({
  type: 'USER_LOGGED_OUT'
})

export const updateLoginInfo = (
  message?: string,
  displayMessage?: boolean,
  loading?: boolean,
  additionalInfo?: Object,
  cancelled?: boolean): Action => ({
    type: 'UPDATE_LOGIN_INFO',
    message: message,
    displayMessage: displayMessage,
    loading: loading,
    additionalInfo: additionalInfo,
    cancelled: cancelled
  })

/**
 * Clear local storage and dispatch an action to tell
 * other components that user has logged out.
 */
export const logout = () => (dispatch: Function) => {
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

/**
 * Ask the API for a token using a facebook or google token, or a
 * signere request id.
 * The API checks that the token or id is valid
 * and then responds with a JSON web token.
 *
 * @param {LoginParams} params Login parameters
 *
 * @return the API's response containing a JSON web token for amodahl.no-api
 */
export const fetchAmodahlToken = (params: LoginParams) =>
(dispatch: Function, getState: Function) => {
  dispatch(requestAmodahlToken())
  dispatch(updateLoginInfo('Logging in to amodahl.no...', true, true, params, false))

  let state = getState()

  params.requestedScopes = JSON.stringify(scopes)

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

export const offlineLogin = () =>
(dispatch: Function, getState: Function) => {
  // try offline login
  dispatch(updateLoginInfo('Looking for user info in local storage...',
    false, false, localStorage, false))
  if (localStorage.loginType) {
    let user
    try {
      // $FlowFixMe
      user = JSON.parse(localStorage.user)
      // $FlowFixMe
      dispatch(receiveAmodahlToken(localStorage.jwToken, user))
      dispatch(updateLoginInfo('You logged in as ' + user.name,
        true, false, user, false))
    } catch (e) {
      dispatch(updateLoginInfo('Invalid login info found in local storage, clearing',
        false, false, localStorage, false))
      localStorage.clear()
    }
  } else {
    // $FlowFixMe
    dispatch(updateLoginInfo(`No login info found in local storage for
      type ${localStorage.loginType}`,
      false, false, localStorage, false))
  }
}

/**
 * Log in to amodahl.no-api using facebook authentication.
 * @param {LoginParams} params Login parameters
 */
export const fbLogin = (_params: LoginParams) =>
(dispatch: Function, getState: Function) => {
  const params = _params
  let state = getState()

  if (params.type !== 'facebook') {
    throw new Error('Invalid params.type: ' + JSON.stringify(params))
  }

  dispatch(requestFbToken())
  dispatch(updateLoginInfo('Logging in with Facebook...',
  true, true, params, false))

  // run after init facebook and login facebook
  const amodahlLogin = (params) => {
    const fbResponse = params.fbResponse
    // ensure facebook login was successful
    if (!fbResponse || !fbResponse.authResponse || !fbResponse.authResponse.accessToken) {
      dispatch(requestFbTokenFailed())
      dispatch(updateLoginInfo('Failed to log in to facebook: ' +
        JSON.stringify(params.fbResponse), true, false, fbResponse, false))
      return
    }

    dispatch(receiveFbToken())
    dispatch(updateLoginInfo('Received token from Facebook',
      true, true, fbResponse.authResponse, false))

    params.fbAccessToken = fbResponse.authResponse.accessToken
    if (!state.cancelled) {
      // fetch token from amodahl.no using facebook token
      dispatch(fetchAmodahlToken(params))
    }
  }

  // run after init facebook
  const fbLogin = () => {
    if (params.fbResponse) {
      amodahlLogin(params)
    } else {
      window.FB.login(fbResponse => {
        params.fbResponse = fbResponse
        amodahlLogin(params)
      }, {scope: 'public_profile, email'})
    }
  }

  if (typeof (document) === 'undefined' || document.getElementById('facebook-jssdk')) {
    fbLogin()
  } else {
    // init facebook sdk first
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: fbAppId,
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
      // $FlowFixMe
      fjs.parentNode.insertBefore(js, fjs)
    }(document, 'script', 'facebook-jssdk'))
  }
}

/**
 * Log in to amodahl.no-api.
 * This means authenticating with (google/facebook/signere)
 * and then requesting an amodahl.no-api token using the token/requestId
 * from (google/facebook/signere).
 *
 * In addition test users defined by the API can log
 * without further identification.
 * @param {LoginParams} params Login parameters
 */
export const login = (_params: LoginParams) =>
(dispatch: Function, getState: Function) => {
  const params = _params
  let state = getState()

  if (params.type === 'facebook') {
    dispatch(fbLogin(params))
  }

  if (params.type === 'signere' && params.signereRequestId) {
    dispatch(fetchAmodahlToken(params))
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

                params.googleIdToken = authResponse.id_token
                dispatch(fetchAmodahlToken(params))
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



  if (params.type === 'test') {
    dispatch(fetchAmodahlToken(params))
  }
}

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
export const myFetch = (dispatch: Function) =>
(jwToken: string) =>
(path: string, params: Object) => {
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
      // clear login info, go to login page and tell user to log in again
      dispatch(logout())
      dispatch(updateLoginInfo('Token expired, please log in again',
        true, false, {body, headers}, false))
      dispatch(push('/login'))
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
