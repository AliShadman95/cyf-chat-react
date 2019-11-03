import {
  POST_MESSAGE,
  GET_MESSAGES,
  DELETE_MESSAGE,
  EDIT_MESSAGE
} from "../actions/types";

const initialState = { items: [], item: [] };

export default (state = initialState, action) => {
  switch (action.type) {
    case POST_MESSAGE:
      return { ...state, items: [...state.items, action.payload] };
    case GET_MESSAGES:
      return { ...state, items: action.payload };
    case DELETE_MESSAGE:
      let newArray = [...state.items];
      return { ...state, items: newArray.filter(e => e._id !== action.id) };
    case EDIT_MESSAGE:
      //Create copy of messages and edit the state
      let copyMess = [...state.items];
      let editedMess = copyMess.find(e => e._id === action.id);
      editedMess.message = action.message;
      let editedMessIndex = copyMess.findIndex(e => e._id === action.id);
      copyMess.splice(editedMessIndex, 1, editedMess);
      return { ...state, items: copyMess };

    default:
      return state;
  }
};
