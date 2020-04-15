import { RECEIVE_USERS } from "../actions/users";
import { ANSWER_QUESTION, SAVE_QUESTION } from "../actions/questions";

export default function Users(state = {}, action) {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users,
      };
    case ANSWER_QUESTION: {
      const { qid, answer, userId } = action;
      const user = state[userId];
      const answers = user["answers"];
      return {
        ...state,
        [userId]: {
          ...user,
          answers: {
            ...answers,
            [qid]: answer,
          },
        },
      };
    }
    case SAVE_QUESTION: {
      const { question } = action;
      const user = state[question.author];
      return {
        ...state,
        [question.author]: {
          ...user,
          questions: [...user.questions, question.id],
        },
      };
    }
    default:
      return state;
  }
}
