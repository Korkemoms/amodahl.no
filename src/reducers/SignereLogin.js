const initialState = {
  url: null
}

export default function update (state = initialState, action) {
  switch (action.type) {
    case 'RECEIVE_SIGNERE_URL':
      return Object.assign({}, state, {
        url: action.url,
        accessToken: action.accessToken
      })

    default:
      return state
  }
}
