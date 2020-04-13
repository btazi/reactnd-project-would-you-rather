import { LOGIN } from "../actions/authedUser";

export default function authedUser(state = "not_connected", action) {
  switch (action.type) {
    case LOGIN:
      return action.user;
    default:
      return state;
  }
}
