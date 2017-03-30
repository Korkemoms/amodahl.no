// @flow
class State {
}

const initialState = new State()

const update = (state: State = initialState, action: Object) => {
  switch (action.type) {
    default:
      return state
  }
}
export default update
