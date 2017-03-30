// @flow

export type Action =
{
  type: 'USER_LOGGED_OUT'
} | {
  type: 'REQUEST_AMODAHL_TOKEN_FAILED'
} | {
  type: 'RECEIVE_SIGNERE_URL',
  url: string,
  accessToken: string,
  requestId: string
} | {
  type: 'RECEIVE_AMODAHL_TOKEN',
  jwToken: string,
  user: Object
} | {
  type: 'UPDATE_LOGIN_INFO',
  message: ?string,
  displayMessage: ?boolean,
  loading: ?boolean,
  additionalInfo: ?Object,
  cancelled: ?boolean
}

export type LoginParams =
{
  type: 'google',
  requestedScopes: string,
  googleIdToken: string,
} | {
  type: 'facebook',
  requestedScopes: string,
  fbAccessToken: string,
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
