// @flow
import 'isomorphic-fetch'
import { push } from 'react-router-redux'
import type { Action, LoginParams } from './Types'
import { ActionTypes } from './Types'
import { createAction } from 'redux-actions'

// determine where to send requests
const url = (): string => {
  const www = (typeof (window) !== 'undefined'
    ? window.location.href.indexOf('www.') : -1) !== -1 ? 'www.' : ''
  return process.env.NODE_ENV === 'production'
    ? `https://${www}amodahl.no/api/public`
    : `http://${www}local.amodahl.no:3000`
}

const fbAppId = '772463112910269'
const googleClientId = '778219340101-tf221dbeeho9frka8js86iv460hfuse0' +
                        '.apps.googleusercontent.com'

// The scopes to request for the token
const scopes = [
  'user.all', 'user.list',
  'chess-game.all', 'chess-game.list', 'chess-game.create',
  'chess-move.all', 'chess-move.list', 'chess-move.create',
  'update.all', 'update.list'
]

/**
 * Normal action
 * Action notifying about login status.
 */
export const updateLoginInfo = (
  message?: string,
  displayMessage?: boolean,
  loading?: boolean,
  additionalInfo?: Object,
  cancelled?: boolean): Action => ({
    type: 'UPDATE_LOGIN_INFO',
    payload: {
      message: message,
      displayMessage: displayMessage,
      loading: loading,
      additionalInfo: additionalInfo,
      cancelled: cancelled
    }
  })

/**
 * Promise action
 * Instead of loading google sdk every time someone uses the app
 * it is loaded on demand with this method.
 */
export const initGoogleSdk = createAction(ActionTypes.INIT_GOOGLE_SDK, async () => {
  let response = await new Promise((resolve, reject) => {
    if (typeof (window) === 'undefined') {
      reject(new Error(
        'Can not init facebook sdk, are you running this in a browser?'
      ))
      return
    }

    window.signinCallback = () => {
      resolve()
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
  })
  return response
})

/**
 * Promise action
 * Instead of loading facebook sdk every time someone uses the app
 * it is loaded on demand with this method.
 */
export const initFbSdk = createAction(ActionTypes.INIT_FB_SDK, async () => {
  let response = await new Promise((resolve, reject) => {
    if (typeof (document) === 'undefined') {
      reject(new Error(
        'Can not init facebook sdk, are you running this in a browser?'
      ))
    } else if (document.getElementById('facebook-jssdk')) {
      resolve()
    } else {
      // init facebook sdk first
      window.fbAsyncInit = () => {
        window.FB.init({
          appId: fbAppId,
          xfbml: true,
          version: 'v2.8'
        })
        window.FB.AppEvents.logPageView()
        resolve()
      }
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
  })
  return response
})

/**
 * Thunk action
 * Clear local storage and dispatch an action notifying
 * that the user logged out.
 */
export const logout = () => (dispatch: Function) => {
  dispatch({ type: ActionTypes.USER_LOGGED_OUT })
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
 * Thunk action
 * Load the user info and token stored in the browser.
 */
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

      dispatch({ type: ActionTypes.FETCH_AMODAHL_TOKEN, payload: {
        // $FlowFixMe
        token: localStorage.token, user: user
      }})
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
 * Promise action
 * Save user info and token in the browser.
 */
export const saveUserInfo = createAction(ActionTypes.SAVE_USER_INFO,
async (type, token, user) => {
  let response = await new Promise((resolve, reject) => {
    // store user info in browser (for next time app is started)
    localStorage.setItem('loginType', type)
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))
    resolve({type, token, user})
  })
  return response
})

/**
 * Promise action
 * Request an amodahl token using a facebook or google token, a
 * signere request id or test user info.
 *
 * @param {LoginParams} params Login parameters
 * @return a promise of a response containing token and userinfo for amodahl.no
 */
export const fetchAmodahlToken = createAction(ActionTypes.FETCH_AMODAHL_TOKEN, async (params) => {
  let response = await new Promise((resolve, reject) => {
    const error = e => reject(new Error(
      'Did not receive amodahl token: ' + JSON.stringify(e)))

    params.requestedScopes = JSON.stringify(scopes)

    var headers = new Headers()
    headers.append('pragma', 'no-cache')
    headers.append('cache-control', 'no-cache')

    return fetch(url() + '/token', {
      method: 'POST',
      headers,
      body: JSON.stringify(params)
    })
    .then(result => {
      if (Number(result.status)>=400) {
        error(result)
      }
      return result.json()
    })
    .then(result => {
      if (!result || !result.token || !result.user) {
        error(result)
      }
      resolve({
        token: result.token,
        user: result.user
      })
    })
    .catch(e => {
      error(e)
    })
  })
  return response
})

/**
 * Promise action
 * Request a google token from google sdk.
 *
 * @param {LoginParams} params Login parameters
 * @return promise of a google token
 */
export const fetchGoogleToken = createAction(ActionTypes.FETCH_GOOGLE_TOKEN, async () => {
  let response = await new Promise((resolve, reject) => {
    const error = e => reject(new Error(
      'Did not receive google token: ' + JSON.stringify(e)))

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
            let authResponse = googleAuth.currentUser.get().getAuthResponse(true)
            resolve(authResponse.id_token)
          }, error) // asdf
        }, error) //
      }, error)
    })
  })
  return response
})

/**
 * Promise action
 * Request a google token from facebook sdk.
 *
 * @param {LoginParams} params Login parameters
 * @return promise of a facebook token
 */
export const fetchFbToken = createAction(ActionTypes.FETCH_FB_TOKEN, async () => {
  let response = await new Promise((resolve, reject) => {
    const error = e => reject(new Error(
      'Did not receive facebook token: ' + JSON.stringify(e)))

    const scopes = {scope: 'public_profile, email'}

    window.FB.login(fbResponse => {
      let token: ?string
      try {
        token = fbResponse.authResponse.accessToken
      } catch (e) {
      }
      if (token) {
        resolve(token)
      } else {
        error(fbResponse)
      }
    }, scopes)
  })
  return response
})

/**
 * Promise action
 * Request a signere url from amodahl-api
 *
 * @param {LoginParams} params Login parameters
 * @return a promise of a signere url
 */
export const fetchSignereUrl = createAction(ActionTypes.FETCH_SIGNERE_URL, async () => {
  let response = await new Promise((resolve, reject) => {
    const error = e => reject(new Error(
      'Did not receive signere url: ' + JSON.stringify(e)))

    fetch(url() + '/token', {
      method: 'POST',
      body: JSON.stringify({
        requested_scopes: JSON.stringify(scopes),
        type: 'signere'
      })
    })
    .then(result => {
      if (Number(result.status)>=400) {
        error(result)
      }
      return result.json()
    })
    .then(result => {
      if (result.Url) {
        resolve(result.Url)
      } else {
        error(result)
      }
    })
    .catch(e => {
      error(e)
    })
  })
  return response
})

/**
 * Thunk action
 * Log in to amodahl.no.
 * This means authenticating with (google/facebook/signere)
 * and then requesting an amodahl-api token using the obtained
 * credentials
 *
 * In addition test users defined by the API can request a token
 * without credentials.
 * @param {LoginParams} params Login parameters
 */
export const login = (_params: LoginParams) =>
(dispatch: Function, getState: Function) => {
  const params = _params
  dispatch(updateLoginInfo(`Logging in with ${params.type}...`,
    true, true, params, false))

  const error = (action) =>
    dispatch(updateLoginInfo('Login failed: ' + JSON.stringify(action),
          true, false, action, false))

  if (params.type === 'signere' && !params.signereRequestId) {
    dispatch(fetchSignereUrl())
    .then(action => {
      if (action.error) {
        error(action)
      } else {
        dispatch(push('/signere-login'))
      }
    })
    return
  }

  new Promise((resolve, reject) => {
    if (params.type === 'google') {
      dispatch(initGoogleSdk())
      .then(action => dispatch(fetchGoogleToken()))
      .then(action => {
        params.googleIdToken = action.payload
        resolve(params)
      })
    }
    if (params.type === 'facebook') {
      dispatch(initFbSdk())
      .then((action) => dispatch(fetchFbToken()))
      .then(action => {
        params.fbAccessToken = action.payload
        resolve(params)
      })
    }
    if (params.type === 'test') {
      resolve(params)
    }

    if (params.type === 'signere' && params.signereRequestId) {
      resolve(params)
    }
  })
  .then(params => dispatch(fetchAmodahlToken(params)))
  .then(action => {
    if (!action.error) {
      return action
    }
    throw new Error(action)
  })
  .then(action => dispatch(saveUserInfo(params.type,
    action.payload.token, action.payload.user)))
  .then(action =>
    dispatch(updateLoginInfo(`You logged in as ${action.payload.user.name}`,
      true, false, params, false))
  )
  .catch(action => {
    error(action)
  })
}

/**
 * Method for fetching stuff from amodahl-api.
 *
 * @param dispatch The redux dispatch function
 * @param token a token for amodahl.no API
 * @param path The url describing what to fetch
 * @param params Additional fetch parameters
 *
 * @return promise that will be resolved with headers and body of API response
 */
export const myFetch = (dispatch: Function) =>
(token: string) =>
(path: string, params: Object) => {
  var headers = params.headers ? params.headers : new Headers()
  headers.append('Authorization', 'Bearer ' + token)
  headers.append('pragma', 'no-cache')
  headers.append('cache-control', 'no-store')

  const properties = {
    headers: headers,
    ...params
  }

  return fetch(url() + path, properties)
  .then(response => response.json()
  .then(json => ({ headers: headers, body: json })))
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
