import { types } from '../constants/ActionTypes'

export const enableFadeIn = () => ({
  type: types.home.ENABLE_FADE_IN
})

export const disableFadeIn = () => ({
  type: types.home.DISABLE_FADE_IN
})
