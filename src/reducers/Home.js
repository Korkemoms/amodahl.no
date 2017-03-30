// @flow
import { types } from '../constants/ActionTypes'

type State = {
  fadeInEnabled: boolean
}

const initialState = {
  fadeInEnabled: true
}

const update = (state: State = initialState, action: Object) => {
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
