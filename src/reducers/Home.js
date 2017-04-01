// @flow
import type { Action } from '../actions/Types'

type State = {
  fadeInEnabled: boolean
}

const initialState = {
  fadeInEnabled: true
}

const update = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case '@@router/LOCATION_CHANGE':
      return Object.assign({}, state, {
        fadeInEnabled: state.fadeInEnabled && action.payload.pathname === '/'
      })

    default:
      return state
  }
}

export default update
