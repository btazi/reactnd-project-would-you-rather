import { LOGIN, LOGOUT } from "../actions/authedUser";

export default function authedUser(state = "not_connected", action) {
  switch (action.type) {
    case LOGIN:
      return action.user;
    case LOGOUT:
      return "not_connected";
    default:
      return state;
  }
}
