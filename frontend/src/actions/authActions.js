import * as actions from "./types";
import axios from "axios";
import jwt_decode from "jwt-decode";
import setAuthToken from "../utils/setAuthToken";

import { clearProfile } from "./profileActions";

// Register
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => {
      history.push("/login");
    })
    .catch(err => {
      dispatch({
        type: actions.GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Login and get user token
export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);

      setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
    })
    .catch(err => {
      dispatch({
        type: actions.GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const setCurrentUser = userData => {
  return {
    type: actions.SET_CURRENT_USER,
    payload: userData
  };
};

export const logoutUser = (user, profile) => dispatch => {
  localStorage.removeItem("jwtToken");
  setAuthToken(false);

  const bClearProfile = user.name !== profile.user.name;
  dispatch(setCurrentUser({}));
  if (bClearProfile) dispatch(clearProfile());
};
