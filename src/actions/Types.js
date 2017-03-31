// @flow

/**
 * These are all the actions in this app.
 * The consequences of the actions are defined by the reducers.
 */
export type Action =
{
  type: 'USER_LOGGED_OUT'
} | {
  type: 'RECEIVE_SIGNERE_URL',
  url: string,
  accessToken: string,
  requestId: string
} | {
  type: 'REQUEST_AMODAHL_TOKEN',
} | {
  type: 'RECEIVE_AMODAHL_TOKEN',
  jwToken: string,
  user: Object
} | {
  type: 'REQUEST_AMODAHL_TOKEN_FAILED'
} | {
  type: 'REQUEST_FB_TOKEN',
} | {
  type: 'RECEIVE_FB_TOKEN',
} | {
  type: 'REQUEST_FB_TOKEN_FAILED'
} | {
  type: 'UPDATE_LOGIN_INFO',
  message?: string,
  displayMessage?: boolean,
  loading?: boolean,
  additionalInfo?: Object,
  cancelled?: boolean
}

export type LoginParams =
{
  type: 'google',
  requestedScopes: string,
  googleIdToken: string
} | {
  type: 'facebook',
  requestedScopes: string,
  fbAccessToken?: string,
  fbResponse?: Object // used to mock a facebook response when testing
} | {
  type: 'signere',
  requestedScopes: string,
  navigate: Function,
  signereRequestId: string,
  signereAccessToken: string
}
| {
  type: 'test',
  requestedScopes: string,
  name: string,
  email: string
}
