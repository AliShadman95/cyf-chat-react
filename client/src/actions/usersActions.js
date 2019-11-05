import { ADD_USER, SET_USERS } from "./types";
import axios from "axios";

export const addUser = room => async dispatch => {};

export const setUsers = user => dispatch => {
  dispatch({ type: SET_USERS, payload: user });
};
