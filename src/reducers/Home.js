// @flow
import { types } from '../constants/ActionTypes'

class State {
  fadeInEnabled: boolean
}

const initialState = new State()
initialState.fadeInEnabled = true

const update = (state: State = initialState, action: Object) => {
  switch (action.type) {
    case types.router.LOCATION_CHANGE():
      return Object.assign({}, state, {
        fadeInEnabled: state.fadeInEnabled && action.payload.pathname === '/'
      })

    default:
      return state
  }
}

export default update
