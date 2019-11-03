import { GET_MESSAGES, POST_MESSAGE } from "./types";
import axios from "axios";

export const getMessages = room => async dispatch => {
  console.log("about to fetch");
  const response = await axios.get(
    `https://chat-by-as.herokuapp.com/messages/rooms/${room}`
  );
  dispatch({ type: GET_MESSAGES, payload: response.data });
};

export const postMessage = message => async dispatch => {
  console.log("about to post");
  const response = await axios.post(
    `https://chat-by-as.herokuapp.com/messages`,
    message
  );
  dispatch({ type: POST_MESSAGE, payload: response.data });
};
