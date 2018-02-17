import { FOO } from '../actions';

const initialState = {
  foo: {
    bar: 'fizzbuzz',
  }
}

const todoApp = (state = initialState, action) => {
  switch (action.type) {
    case FOO:
      return {
        ...state,
        ...action.bar,
      }
  }

  return state
}
