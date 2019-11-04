import { combineReducers } from "redux";
import messagesReducer from "./messagesReducer.js";
import usersReducer from "./usersReducer.js";
import roomReducer from "./roomReducer.js";
import userTypingReducer from "./userTypingReducer";

export default combineReducers({
  messages: messagesReducer,
  users: usersReducer,
  room: roomReducer,
  userTyping: userTypingReducer
});
