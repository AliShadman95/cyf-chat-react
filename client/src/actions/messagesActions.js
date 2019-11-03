import {
  GET_MESSAGES,
  POST_MESSAGE,
  DELETE_MESSAGE,
  EDIT_MESSAGE,
  SEARCH_MESSAGE
} from "./types";
import axios from "axios";

export const getMessages = room => async dispatch => {
  console.log("about to fetch");
  const response = await axios.get(
    `https://chat-by-as.herokuapp.com/messages/rooms/${room}`
  );
  dispatch({ type: GET_MESSAGES, payload: response.data });
};

export const postMessage = user => async dispatch => {
  console.log("about to post");
  const response = await axios.post(
    `https://chat-by-as.herokuapp.com/messages`,
    user
  );
  dispatch({ type: POST_MESSAGE, payload: response.data });
  // dispatch(getMessages(user.room));
};

export const deleteMessage = id => async dispatch => {
  console.log("about to delete");
  const response = await axios.delete(
    `https://chat-by-as.herokuapp.com/messages/id/${id}`
  );

  dispatch({ type: DELETE_MESSAGE, id: id });
};

export const editMessage = (id, message) => async dispatch => {
  console.log("about to edit");
  const response = await axios.put(
    `https://chat-by-as.herokuapp.com/messages/id/${id}`,
    {
      message
    }
  );

  dispatch({ type: EDIT_MESSAGE, id: id, message });
};

export const searchMessage = (value, type) => async dispatch => {
  const str = type === 0 ? `${value}` : `room/${room}/${value}`;
  const response = await axios.get(
    `https://chat-by-as.herokuapp.com/messages/search/${str}`
  );

  dispatch({ type: SEARCH_MESSAGE, payload: response.data });
};
