import expect from 'expect'

import { types } from '../constants/ActionTypes'
import * as actions from './LeveringMontering'

describe('actions', () => {
  it('should create an action to enable fade in on home page', () => {
    let index = Math.floor((Math.random() * 1000))
    let direction = Math.random() < 0.5 ? 'left' : 'right'

    const expectedAction = {
      type: types.leveringMontering.CAROUSEL_SELECT,
      selectedIndex: index,
      direction: direction
    }
    expect(actions.carouselSelect(index, direction)).toEqual(expectedAction)
  })
})
