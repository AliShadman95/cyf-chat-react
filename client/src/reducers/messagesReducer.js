import {
  POST_MESSAGE,
  GET_MESSAGES,
  DELETE_MESSAGE,
  EDIT_MESSAGE,
  SEARCH_MESSAGE
} from "../actions/types";

const initialState = { items: [], item: [], searchedResults: [] };

export default (state = initialState, action) => {
  switch (action.type) {
    case POST_MESSAGE:
      return { ...state, items: [...state.items, action.payload] };
    case GET_MESSAGES:
      let copyArr = [...state.items];
      let copyAction = [...action.payload];
      if (copyArr[0]) {
        if (copyArr[0].length < 1) {
          copyAction.push(copyArr[0]);
        }
      }
      return {
        ...state,
        items: copyArr[0] ? copyAction : action.payload
      };
    case DELETE_MESSAGE:
      let newArray = [...state.items];
      console.log(newArray.filter(e => e._id !== action.id));
      return { ...state, items: newArray.filter(e => e._id !== action.id) };
    case EDIT_MESSAGE:
      //Create copy of messages and edit the state
      let copyMess = [...state.items];
      let editedMess = copyMess.find(e => e._id === action.id);
      editedMess.message = action.message;
      let editedMessIndex = copyMess.findIndex(e => e._id === action.id);
      copyMess.splice(editedMessIndex, 1, editedMess);
      return { ...state, items: copyMess };

    case SEARCH_MESSAGE:
      return { ...state, searchedResults: action.payload };

    default:
      return state;
  }
};
