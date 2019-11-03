import { combineReducers } from "redux";
import getMessages from "./getMessages.js";

export default combineReducers({ messages: getMessages });
