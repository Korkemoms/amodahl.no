import { types } from '../constants/ActionTypes'

export const enableFadeIn = () => {
  return {
    type: types.home.ENABLE_FADE_IN
  }
}
export const disableFadeIn = () => {
  return {
    type: types.home.DISABLE_FADE_IN
  }
}
