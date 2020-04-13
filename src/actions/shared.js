import { handleReceiveUsers } from "./users";
import { handleReceiveQuestions } from "./questions";

export function getInitialData() {
  return (dispatch) => {
    dispatch(handleReceiveUsers());
    dispatch(handleReceiveQuestions());
  };
}
