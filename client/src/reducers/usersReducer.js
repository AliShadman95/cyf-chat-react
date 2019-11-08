import { ADD_USER, SET_USERS, REMOVE_USER } from "../actions/types";

const initialState = { items: [], item: [] };

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER:
      return { ...state, items: [...state.items, action.payload] };
    case SET_USERS:
      return { ...state, items: action.payload };
    case REMOVE_USER:
      const copyState = [...state.items].filter(e => e.id !== action.id);
      console.log(copyState);
      return { ...state, items: copyState };
    default:
      return state;
  }
};
