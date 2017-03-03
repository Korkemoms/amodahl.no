const initialState = {
  fadeInEnabled: true
}

export default function update (state = initialState, action) {
  switch (action.type) {
    case 'TOGGLE_FADE_IN_ENABLED':
      return Object.assign({}, state, {
        fadeInEnabled: action.fadeInEnabled
      })
    default:
      return state
  }
}
