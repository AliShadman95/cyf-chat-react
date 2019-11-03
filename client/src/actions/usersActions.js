import { ADD_USER } from "./types";
import axios from "axios";

export const addUser = room => async dispatch => {
  console.log("about to fetch");
  const response = await axios.get(
    `https://chat-by-as.herokuapp.com/messages/rooms/${room}`
  );
  dispatch({ type: GET_MESSAGES, payload: response.data });
};
