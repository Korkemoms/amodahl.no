import fetch from 'isomorphic-fetch'
import { types } from '../constants/ActionTypes'

// determine where to send requests
const www = window.location.href.indexOf('www.') !== -1 ? 'www.' : ''
const url = process.env.NODE_ENV === 'production'
  ? `https://${www}amodahl.no/api/public` : `http://${www}local.amodahl.no:3000`

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

export const receiveAmodahlToken = (jwToken, user) => {
  return {
    jwToken: jwToken,
    user: user,
    type: types.login.RECEIVE_AMODAHL_TOKEN
  }
}

export const receievSignereUrl = (url, accessToken, requestId) => {
  return {
    type: types.login.RECEIVE_SIGNERE_URL,
    url: url,
    accessToken: accessToken,
    requestId: requestId
  }
}

export const receiveAmodahlTokenFailed = () => {
  return {
    type: types.login.RECEIVE_AMODAHL_TOKEN_FAILED
  }
}

export const deleteAmodahlToken = (dispatchedFrom) => {
  return {
    jwToken: null,
    dispatchedFrom: dispatchedFrom,
    type: types.login.DELETE_AMODAHL_TOKEN
  }
}

export const updateLoginInfo = (message, displayMsg, loading, info) => {
  return {
    message: message,
    displayMessage: displayMsg,
    loading: loading,
    additionalInfo: info,
    type: types.login.UPDATE_LOGIN_INFO
  }
}

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
const fetchJwToken = params => dispatch => {
  dispatch(updateLoginInfo('Logging in to amodahl.no...', true, true, params))

  // prepare body
  // TODO JSON?
  var form = new FormData()
  form.append('requested_scopes', JSON.stringify(scopes)) // defined top of doc
  if (params.fbAccessToken) {
    form.append('fb_access_token', params.fbAccessToken)
  }
  if (params.googleIdToken) {
    form.append('google_id_token', params.googleIdToken)
  }
  if (params.signereRequestId) {
    form.append('signere_request_id', params.signereRequestId)
  }
  if (params.signereAccessToken) {
    form.append('signere_access_token', params.signereAccessToken)
  }
  if (params.name) {
    form.append('name', params.name)
  }
  if (params.email) {
    form.append('email', params.email)
  }
  if (params.type) {
    form.append('type', params.type)
  }

  var headers = new Headers()
  headers.append('pragma', 'no-cache')
  headers.append('cache-control', 'no-cache')

  return fetch(url + '/token', {
    method: 'POST',
    headers,
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
    if (response.status !== 'ok') {
      throw new Error('Received: ' + JSON.stringify(response))
    }
    return response
  })
  .then(response => {
    dispatch(receiveAmodahlToken(response.token, response.user))
    dispatch(updateLoginInfo('You logged in as ' + response.user.name,
        true, false, response))

    // store user info in browser (for next time app is started)
    localStorage.setItem('loginType', params.type)
    localStorage.setItem('jwToken', response.token)
    localStorage.setItem('user', JSON.stringify(response.user))
  })
  .catch(error => {
    dispatch(receiveAmodahlTokenFailed())
    dispatch(updateLoginInfo('Failed to log in to amodahl.no: '
      + error.message, true, false, error))
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
export const login = params => dispatch => {
  if (!params) {
    // use same login type as last time
    params = {
      type: localStorage.loginType
    }
  }

  // try offline login
  dispatch(updateLoginInfo('Looking for user info in local storage...',
    false, false, params))
  if (localStorage.loginType && localStorage.loginType === params.type) {
    let user
    try {
      user = JSON.parse(localStorage.user)
      dispatch(receiveAmodahlToken(localStorage.jwToken, user))
      dispatch(updateLoginInfo('You logged in as ' + user.name,
        true, false, user))
      return
    } catch (e) {
      dispatch(updateLoginInfo(`Invalid login info found in local storage, clearing`,
        false, false, localStorage))
      localStorage.clear()
    }
  } else {
    dispatch(updateLoginInfo(`No ${params.type} login info found in local storage`,
      false, false, localStorage))
  }

  if (params.type === 'signere' && params.signereRequestId) {
    dispatch(fetchJwToken(params))
  } else if (params.type === 'signere') {
    dispatch(updateLoginInfo('Requesting url from Signere.no', true, true, params))

    // get url for iframe
    var form = new FormData()
    form.append('requested_scopes', JSON.stringify(scopes))
    form.append('type', 'signere')
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
    .then(result => {
      dispatch(updateLoginInfo('Received url from Signere.no', true, true, result))
      dispatch(receievSignereUrl(result.Url, result.AccessToken, result.RequestId))

      params.navigate('/signere-login')
    })
  }

  if (params.type === 'google') {
    dispatch(updateLoginInfo('Logging in with Google...', true, true, params))

    const clId = '778219340101-tf221dbeeho9frka8js86iv460hfuse0.apps.googleusercontent.com'

    const errorCallback = error => {
      dispatch(updateLoginInfo('Failed to log in to google: ' +
        JSON.stringify(error), true, false, error))
    }

    window.signinCallback = () => {
      console.log('Signing in with google')

      // TODO improve
      window.gapi.load('auth2', function () {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        window.gapi.auth2.init({
          client_id: clId,
          cookiepolicy: 'single_host_origin'
        })
        .then(args => {
          window.gapi.auth2.getAuthInstance()
          .then(googleAuth => {
            googleAuth.signIn()
            .then(result => {
              let authResponse = googleAuth.currentUser.get()
                                  .getAuthResponse(true)

              // finally we got google token and can trade it for an amodahl token
              dispatch(updateLoginInfo('Received token from Google',
                true, true, authResponse))
              dispatch(fetchJwToken({
                googleIdToken: authResponse.id_token,
                ...params
              }))
            }, errorCallback) //
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
    dispatch(updateLoginInfo('Logging in with Facebook...', true, true, params))

    // to be called after init facebook sdk
    const fbLogin = () => {
      window.FB.login(fbResponse => {
        if (!fbResponse.authResponse) { // ensure facebook login was successful
          dispatch(updateLoginInfo('Failed to log in to facebook: ' +
            JSON.stringify(fbResponse), true, false, fbResponse))
          return
        }

        dispatch(updateLoginInfo('Received token from Facebook',
          true, true, fbResponse.authResponse))

        let fbAccessToken = fbResponse.authResponse.accessToken
        // fetch token from amodahl.no using facebook token

        dispatch(fetchJwToken({
          ...params,
          fbAccessToken: fbAccessToken
        }))
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

  return fetch(url + path, properties)
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
export const logout = dispatcher => dispatch => {
  dispatch(deleteAmodahlToken(dispatcher))
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
