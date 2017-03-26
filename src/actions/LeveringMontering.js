import { types } from '../constants/ActionTypes'

export const carouselSelect = (selectedIndex, e) => {
  return {
    type: types.leveringMontering.LEVERING_MONTERING_CAROUSEL_SELECT,
    selectedIndex: selectedIndex,
    direction: e.direction
  }
}
