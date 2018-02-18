export const SUBMIT = 'SUBMIT';
export const SET_VALUE = 'SET_VALUE';

export const submit = (submissionData) => {
    return {
      type: SUBMIT,
      submissionData,
    };
};

export const setValue = (value) => {
  return {
    type: SET_VALUE,
    value,
  };
};
