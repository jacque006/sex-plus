import { SUBMIT } from '../actions';

const initialState = {
  submit: {
    submissionData: {},
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
      case SUBMIT:
        return {
          ...state,
          submit: {
            submissionData: action.submissionData,
          },
        };
  }

  return state
};
