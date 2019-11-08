import { ADD_USER, SET_USERS, REMOVE_USER } from "./types";
import axios from "axios";

export const addUser = room => async dispatch => {};

export const removeUser = id => async dispatch => {
  dispatch({ type: REMOVE_USER, id });
};

export const setUsers = user => dispatch => {
  dispatch({ type: SET_USERS, payload: user });
};
