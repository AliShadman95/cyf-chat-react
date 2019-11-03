import { GET_MESSAGES } from "./types";
import axios from "axios";

export const getMessages = () => async dispatch => {
  console.log("about to fetch");
  const response = await axios.get(
    `https://chat-by-as.herokuapp.com/messages/rooms/main`
  );
  dispatch({ type: GET_MESSAGES, payload: response.data });
};
