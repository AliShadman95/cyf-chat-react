import { POST_MESSAGE, GET_MESSAGES } from "../actions/types";

const initialState = { items: [], item: [] };

export default (state = initialState, action) => {
  switch (action.type) {
    case POST_MESSAGE:
      console.log("inside post mess r ");
      return { ...state, item: action.payload };
    case GET_MESSAGES:
      console.log("inside get mess r");
      return { ...state, items: action.payload };
    default:
      return state;
  }
};
