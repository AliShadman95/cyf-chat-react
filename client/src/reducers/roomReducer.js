import { SET_ROOM } from "../actions/types";

const initialState = { item: "main" };

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ROOM:
      return { ...state, item: action.payload };

    default:
      return state;
  }
};
