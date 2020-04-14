import { RECEIVE_USERS } from "../actions/users";
import { ANSWER_QUESTION } from "../actions/questions";

export default function Users(state = {}, action) {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users,
      };
    default:
      return state;
  }
}
