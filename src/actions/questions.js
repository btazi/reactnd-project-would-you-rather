import { _getQuestions, _saveQuestionAnswer, _saveQuestion } from "../_DATA.js";
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

function saveQuestion(question) {
  return {
    type: SAVE_QUESTION,
    question,
  };
}

export function handleSaveQuestion(question) {
  const { optionOneText, optionTwoText } = question;
  return (dispatch, getState) => {
    const { authedUser } = getState();
    return _saveQuestion({
      optionOneText,
      optionTwoText,
      author: authedUser,
    }).then((question) => {
      dispatch(saveQuestion(question));
    });
  };
}
