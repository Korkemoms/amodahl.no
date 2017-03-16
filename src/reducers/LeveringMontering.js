const initialState = {
  carouselIndex: 0,
  carouselDirection: null
}

export default function update (state = initialState, action) {
  switch (action.type) {
    case 'DISABLE_FADE_IN':
      return Object.assign({}, state, {
        fadeInEnabled: false
      })
    case 'ENABLE_FADE_IN':
      return Object.assign({}, state, {
        fadeInEnabled: true
      })
    default:
      return state
  }
}
