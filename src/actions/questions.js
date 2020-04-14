import { _getQuestions, _saveQuestionAnswer } from "../_DATA.js";
export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ANSWER_QUESTION = "ANSWER_QUESTION";

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

function answerQuestion(qid, answer, userId) {
  return {
    type: ANSWER_QUESTION,
    qid,
    answer,
    userId,
  };
}

export function handleAnswerQuestion(qid, answer) {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    return _saveQuestionAnswer({ authedUser, qid, answer }).then(() => {
      dispatch(answerQuestion(qid, answer, authedUser));
    });
  };
}
