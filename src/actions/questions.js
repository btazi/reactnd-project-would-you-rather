import { _getQuestions } from "../_DATA.js";
export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";

function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
}

export function handleReceiveQuestions() {
  return (dispatch) => {
    return _getQuestions().then((questions) => {
      dispatch(receiveQuestions(questions));
    });
  };
}
