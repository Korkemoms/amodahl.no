import expect from 'expect'

import { types } from '../constants/ActionTypes'
import * as actions from './Login'

describe('actions', () => {
  it('should create an action carrying updated login info', () => {
    let message = (Math.random() + 1).toString(36).substring(16)
    let displayMessage = Math.random() < 0.5
    let loading = Math.random() < 0.5
    let additionalInfo = {
      a: (Math.random() + 1).toString(36).substring(16),
      b: (Math.random() + 1).toString(36).substring(16)
    }

    const expectedAction = {
      message,
      displayMessage,
      loading,
      additionalInfo,
      type: types.login.UPDATE_LOGIN_INFO
    }
    expect(actions.updateLoginInfo(message, displayMessage, loading, additionalInfo))
    .toEqual(expectedAction)
  })

  it('should create an action notifying that the user initiated log out', () => {
    let dispatchedFrom = (Math.random() + 1).toString(36).substring(16)

    const expectedAction = {
      type: types.login.USER_LOGGED_OUT,
      dispatchedFrom
    }
    expect(actions.userLoggedOut(dispatchedFrom)).toEqual(expectedAction)
  })

  it('should create an action carrying received token and user details', () => {
    let name = (Math.random() + 1).toString(36).substring(7)
    let email = (Math.random() + 1).toString(36).substring(7) + '@' +
        (Math.random() + 1).toString(36).substring(5) + '.' +
        (Math.random() + 1).toString(36).substring(3)
    let user = {
      name,
      email
    }

    let jwToken = (Math.random() + 1).toString(36).substring(16)

    const expectedAction = {
      type: types.login.RECEIVE_AMODAHL_TOKEN,
      user,
      jwToken
    }
    expect(actions.receiveAmodahlToken(jwToken, user)).toEqual(expectedAction)
  })

  it('should create an action carrying received url, access token and request id', () => {
    let url = (Math.random() + 1).toString(36).substring(16)
    let accessToken = (Math.random() + 1).toString(36).substring(16)
    let requestId = (Math.random() + 1).toString(36).substring(16)

    const expectedAction = {
      type: types.login.RECEIVE_SIGNERE_URL,
      url,
      accessToken,
      requestId
    }
    expect(actions.receiveSignereUrl(url, accessToken, requestId)).toEqual(expectedAction)
  })

  it('should create an action notifying that a request for an amodahl token has failed', () => {
    const expectedAction = {
      type: types.login.REQUEST_AMODAHL_TOKEN_FAILED
    }
    expect(actions.requestAmodahlTokenFailed()).toEqual(expectedAction)
  })
})
