import { combineReducers } from "redux";
import messagesReducer from "./messagesReducer.js";
import usersReducer from "./usersReducer.js";
import roomReducer from "./roomReducer.js";

export default combineReducers({
  messages: messagesReducer,
  users: usersReducer,
  room: roomReducer
});
