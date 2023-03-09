function reducer(state, { type, payload }) {
  switch (type) {
    case 'update': {
      return { ...state, [payload.key]: payload.value }
    }
    case 'set_multiple': {
      return { ...state, ...payload }
    }
    case 'clear': {
      return { ...initialState }
    }
    default:
      throw new Error(`Unknown action type: ${type}`)
  }
}

const initialState = {
  questions: [],
  selections: [null],
  loading: true,
  gameStart: false,
  gameOver: false
}

export { reducer, initialState }
