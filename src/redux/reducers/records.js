import { SUBMIT, SET_VALUE } from '../actions';

const initialState = {
  records: {},
  currentValue: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
      case SUBMIT:
        const newSubmissions = state.submissions;

        newSubmissions.push(action.submissionData);

        return {
          ...state,
          records: {
            submissions: newSubmissions,
          },
        };
      case SET_VALUE:
        return {
          ...state,
          currentValue: action.value,
        };
  }

  return state;
};
