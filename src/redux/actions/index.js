export const SUBMIT = 'SUBMIT';

export const submit = (submissionData) => {
    return {
      type: SUBMIT,
      submissionData,
    };
};
