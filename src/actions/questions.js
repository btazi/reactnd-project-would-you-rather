import { _getQuestions, _saveQuestionAnswer, _saveQuestion } from "../_DATA.js";
import { showLoading, hideLoading } from "react-redux-loading-bar";
export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ANSWER_QUESTION = "ANSWER_QUESTION";
export const SAVE_QUESTION = "SAVE_QUESTION";

function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
}

export function handleReceiveQuestions() {
  return (dispatch) => {
    dispatch(showLoading());
    return _getQuestions()
      .then((questions) => {
        dispatch(receiveQuestions(questions));
      })
      .then(() => dispatch(hideLoading()))
      .catch(() => {
        alert("Error: could not get questions");
        dispatch(hideLoading());
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
    dispatch(showLoading());
    const { authedUser } = getState();
    return _saveQuestionAnswer({ authedUser, qid, answer })
      .then(() => {
        dispatch(answerQuestion(qid, answer, authedUser));
      })
      .then(() => dispatch(hideLoading()))
      .catch(() => {
        dispatch(hideLoading());
        alert("Error: Could not answer the question.");
      });
  };
}

function saveQuestion(question) {
  return {
    type: SAVE_QUESTION,
    question,
  };
}

export function handleSaveQuestion(question) {
  const { optionOneText, optionTwoText } = question;
  return (dispatch, getState) => {
    dispatch(showLoading());
    const { authedUser } = getState();
    return _saveQuestion({
      optionOneText,
      optionTwoText,
      author: authedUser,
    })
      .then((question) => {
        dispatch(saveQuestion(question));
      })
      .then(() => dispatch(hideLoading()))
      .catch(() => {
        dispatch(hideLoading());
        alert("Error: could not add the question.");
      });
  };
}
