import expect from 'expect'

import { types } from '../constants/ActionTypes'
import * as actions from './Home'

describe('actions', () => {
  it('should create an action to enable fade in on home page', () => {
    const expectedAction = {
      type: types.home.ENABLE_FADE_IN
    }
    expect(actions.enableFadeIn()).toEqual(expectedAction)
  })
  it('should create an action to disable fade in on home page', () => {
    const expectedAction = {
      type: types.home.DISABLE_FADE_IN
    }
    expect(actions.disableFadeIn()).toEqual(expectedAction)
  })
})
