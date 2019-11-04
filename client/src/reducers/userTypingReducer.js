import { SET_USER_TYPING } from "../actions/types";

const initialState = { item: " is typing.." };

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_TYPING:
      return { ...state, item: action.payload };

    default:
      return state;
  }
};
