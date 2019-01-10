import * as actions from "./types";
import axios from "axios";

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
