import axios from "axios";

import { saveData } from "../../utils/localStorage";

import {
  LOGIN_REQ,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_PAGE,
} from "./actiontype";

export const loginregister = (payload) => {
  return {
    type: LOGIN_REQ,
    payload,
  };
};

export const sucessLoginreq = (payload) => {
  return {
    type: LOGIN_SUCCESS,
    payload,
  };
};

export const failureLoginreq = (payload) => {
  return {
    type: LOGIN_FAILURE,
    payload,
  };
};

export const logoutpage = () => {
  return {
    type: LOGOUT_PAGE,
  };
};

export const loginruser = (payload) => (dispatch) => {
  dispatch(loginregister());
  
  axios.post('/users/login', { email: payload.email,
      password: payload.password,})
    .then((res) => {
      dispatch(sucessLoginreq(res.data));
    })
    .catch((err) => {
      dispatch(failureLoginreq(err));
    });
};
