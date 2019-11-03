import { GET_MESSAGES, POST_MESSAGE } from "../actions/types";

const initialState = { items: [], item: [] };

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_MESSAGES:
      return { ...state, items: action.payload };
    case POST_MESSAGE:
      console.log("inside recuder");
      return { ...state, item: action.payload };
    default:
      return state;
  }
};
