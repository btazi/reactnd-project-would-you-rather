import {
  RECEIVE_QUESTIONS,
  ANSWER_QUESTION,
  SAVE_QUESTION,
} from "../actions/questions";

export default function Questions(state = {}, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions,
      };
    case ANSWER_QUESTION: {
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
    }
    case SAVE_QUESTION: {
      const { question } = action;
      return {
        ...state,
        [question.id]: {
          ...question,
        },
      };
    }
    default:
      return state;
  }
}
