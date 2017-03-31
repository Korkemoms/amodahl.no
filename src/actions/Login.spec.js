// @flow
import expect from 'expect'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'
import { types } from '../constants/ActionTypes'
import * as actions from './Login'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

// determine where to send requests
const url = 'https://amodahl.no/api/public'

const makeStore = (middleware) => {
  const middlewares = [ thunk, middleware ]
  return configureMockStore(middlewares)
}

describe('Facebook login actions', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('fbLogin should result in RECEIVE_FB_TOKEN and ' +
  'REQUEST_AMODAHL_TOKEN being dispatched', () => {
    let action1Dispatched = false
    let action2Dispatched = false

    const store = makeStore(store => next => action => {
      action1Dispatched = action1Dispatched || (action.type === 'RECEIVE_FB_TOKEN')
      action2Dispatched = action2Dispatched || (action.type === 'REQUEST_AMODAHL_TOKEN')

      if (!action1Dispatched || !action2Dispatched) {
        return next(action)
      }
    })({})

    const accessToken = Math.random().toString(36).substring(7)

    const params = {
      type: 'facebook',
      requestedScopes: 'root',
      fbResponse: { // mock response
        authResponse: {
          accessToken
        }
      }
    }
    store.dispatch(actions.login(params))

    expect(action1Dispatched).toEqual(true)
    expect(action2Dispatched).toEqual(true)
  })

  it('fbLogin should result in REQUEST_FB_TOKEN_FAILED being dispatched ' +
  'if no facebook access token is received', () => {
    let actionDispatched = false
    const store = makeStore(store => next => action => {
      actionDispatched = actionDispatched || (action.type === 'REQUEST_FB_TOKEN_FAILED')
      if (!actionDispatched) {
        return next(action)
      }
    })({})

    const params = {
      type: 'facebook',
      requestedScopes: 'root',
      fbResponse: { // mock response
        authResponse: {
          // accessToken
        }
      }
    }
    store.dispatch(actions.login(params))

    expect(actionDispatched).toEqual(true)
  })
})
