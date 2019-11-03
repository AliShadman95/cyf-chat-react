import { GET_MESSAGES } from "../actions/types";

const initialState = { items: [], item: [] };

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_MESSAGES:
      console.log("reducer");
      return { ...state, items: action.payload };
    default:
      return state;
  }
};
