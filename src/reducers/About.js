const initialState = {
  readMore: false
}

export default function update (state = initialState, action) {
  switch (action.type) {
    case 'TOGGLE_READ_MORE':
      return Object.assign({}, state, {
        readMore: action.readMore
      })
    default:
      return state
  }
}
