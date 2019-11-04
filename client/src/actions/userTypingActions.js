import { SET_USER_TYPING } from "./types";

export const setUserTyping = user => dispatch => {
  dispatch({ type: SET_USER_TYPING, payload: user });
};
