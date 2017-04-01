// @flow

export const ActionTypes = {
  DISABLE_FADE_IN: 'DISABLE_FADE_IN',
  USER_LOGGED_OUT: 'USER_LOGGED_OUT',
  UPDATE_LOGIN_INFO: 'UPDATE_LOGIN_INFO',
  FETCH_AMODAHL_TOKEN: 'FETCH_AMODAHL_TOKEN',
  FETCH_SIGNERE_URL: 'FETCH_SIGNERE_URL',
  FETCH_FB_TOKEN: 'FETCH_FB_TOKEN',
  FETCH_GOOGLE_TOKEN: 'FETCH_GOOGLE_TOKEN'
}

/**
 * These are all the actions in this app.
 * The consequences of the actions are defined by the reducers.
 */
export type Action =
({
  type: 'DISABLE_FADE_IN'
} | {
  type: 'USER_LOGGED_OUT'
} | {
  type: 'UPDATE_LOGIN_INFO',
  payload: {
    message?: string,
    displayMessage?: boolean,
    loading?: boolean,
    additionalInfo?: Object,
    cancelled?: boolean
  }
} | {
  type: 'FETCH_AMODAHL_TOKEN',
  payload: {
    token: string,
    user: Object
  }
} | {
  type: 'FETCH_SIGNERE_URL',
  payload: string
} | {
  type: 'FETCH_FB_TOKEN',
} | {
  type: 'FETCH_GOOGLE_TOKEN',
})

export type LoginParams =
{
  type: 'google',
  requestedScopes: string,
  googleIdToken: string
} | {
  type: 'facebook',
  requestedScopes: string,
  fbAccessToken?: string,
} | {
  type: 'signere',
  requestedScopes: string,
  navigate: Function,
  signereRequestId: string
} | {
  type: 'test',
  requestedScopes: string,
  name: string,
  email: string
}
