const initialState = {
  carouselIndex: 0,
  carouselDirection: null
}

export default function update (state = initialState, action) {
  switch (action.type) {
    case '@@leveringMontering/CAROUSEL_SELECT':
      return Object.assign({}, state, {
        carouselIndex: action.selectedIndex,
        carouselDirection: action.direction
      })
    default:
      return state
  }
}
