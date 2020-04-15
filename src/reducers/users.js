import { RECEIVE_USERS } from "../actions/users";
import { ANSWER_QUESTION } from "../actions/questions";

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
    default:
      return state;
  }
}
