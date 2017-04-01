// @flow
import expect from 'expect'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import promiseMiddleware from 'redux-promise'
import * as actions from './Login'
import fetchMock from 'fetch-mock'

const middlewares = [ promiseMiddleware, thunk ]
const mockStore = configureMockStore(middlewares)

describe('Signere login actions', () => {
  it('fetchSignereUrl resolves with correct url', async () => {
    const store = mockStore({})

    const url = Math.random().toString(36).substring(7)
    const expectedActions = [{
      type: 'FETCH_SIGNERE_URL',
      payload: url
    }]

    fetchMock.postOnce('*', {Url: url})

    await store.dispatch(actions.fetchSignereUrl())
    .then((action) => {
      expect(store.getActions()).toEqual(expectedActions)
    })
    .catch(e => {
      fail(e)
    })
  })

  it('fetchSignereUrl resolves with error=true if bad response', async () => {
    let store = mockStore({})
    fetchMock.postOnce('*', {foo: 'bar'})
    await store.dispatch(actions.fetchSignereUrl())
    .then((action) => {
      expect(action.error).toEqual(true)
    })
    .catch(e => {
      fail(e)
    })

    store = mockStore({})
    fetchMock.postOnce('*', 'asdf')
    await store.dispatch(actions.fetchSignereUrl())
    .then((action) => {
      expect(action.error).toEqual(true)
    })
    .catch(e => {
      fail(e)
    })

    store = mockStore({})
    fetchMock.postOnce('*', ['token'])
    await store.dispatch(actions.fetchSignereUrl())
    .then((action) => {
      expect(action.error).toEqual(true)
    })
    .catch(e => {
      fail(e)
    })

    store = mockStore({})
    fetchMock.postOnce('*', {body: {Url: '123'}, status: 400})
    await store.dispatch(actions.fetchSignereUrl())
    .then((action) => {
      expect(action.error).toEqual(true)
    })
    .catch(e => {
      fail(e)
    })
  })
})
