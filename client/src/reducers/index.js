import { combineReducers } from "redux";
import messagesReducer from "./messagesReducer.js";

export default combineReducers({ messages: messagesReducer });
