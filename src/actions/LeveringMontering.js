import { types } from '../constants/ActionTypes'

export const carouselSelect = (selectedIndex, direction) => ({
  type: types.leveringMontering.CAROUSEL_SELECT,
  selectedIndex: selectedIndex,
  direction: direction
})
