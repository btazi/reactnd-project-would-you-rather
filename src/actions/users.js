import { _getUsers } from "../_DATA.js";
import { showLoading, hideLoading } from "react-redux-loading-bar";
export const RECEIVE_USERS = "RECEIVE_USERS";

function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users,
  };
}

export function handleReceiveUsers() {
  return (dispatch) => {
    dispatch(showLoading());
    return _getUsers()
      .then((users) => {
        dispatch(receiveUsers(users));
      })
      .then(() => dispatch(hideLoading()))
      .catch(() => {
        dispatch(hideLoading());
        alert("Error: could not get the users");
      });
  };
}
