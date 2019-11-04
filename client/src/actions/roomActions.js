import { SET_ROOM } from "./types";
import axios from "axios";

export const setRoom = room => dispatch => {
  dispatch({ type: SET_ROOM, payload: room });
};
