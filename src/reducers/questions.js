import { RECEIVE_QUESTIONS, ANSWER_QUESTION } from "../actions/questions";

export default function Questions(state = {}, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions,
      };
    case ANSWER_QUESTION:
      const { qid, answer, userId } = action;
      const question = state[qid];
      return {
        ...state,
        [action.qid]: {
          ...question,
          [answer]: {
            ...question[answer],
            votes: [...question[answer].votes, userId],
          },
        },
      };
    default:
      return state;
  }
}
