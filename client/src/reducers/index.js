import { combineReducers } from "redux";
import messagesReducer from "./messagesReducer.js";
import usersReducer from "./usersReducer.js";

export default combineReducers({
  messages: messagesReducer,
  users: usersReducer
});
