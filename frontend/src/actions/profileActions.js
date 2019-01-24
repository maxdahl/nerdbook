import axios from "axios";

import * as actions from "./types";

export const getProfileById = userId => dispatch => {
  axios
    .get(`/api/profile/user/${userId}`)
    .then(res => {
      dispatch({
        type: actions.GET_PROFILE,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: actions.GET_PROFILE,
        payload: null
      });
    });
};

export const getProfiles = () => dispatch => {
  dispatch(profileLoading());
  axios
    .get("/api/profile/all")
    .then(res => {
      dispatch({
        type: actions.GET_PROFILES,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: actions.GET_PROFILES,
        payload: null
      });
    });
};

// Get current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(profileLoading());
  axios
    .get("/api/profile")
    .then(res => {
      dispatch({
        type: actions.GET_PROFILE,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: actions.GET_PROFILE,
        payload: {}
      })
    );
};

export const getProfileByHandle = handle => dispatch => {
  dispatch(profileLoading());
  axios
    .get(`/api/profile/handle/${handle}`)
    .then(res => {
      dispatch({
        type: actions.GET_PROFILE,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: actions.GET_PROFILE,
        payload: null
      })
    );
};

export const createProfile = (profileData, history) => dispatch => {
  axios
    .post("/api/profile", profileData)
    .then(res => {
      history.push("/dashboard");
    })
    .catch(err => {
      dispatch({
        type: actions.GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const profileLoading = () => {
  return {
    type: actions.PROFILE_LOADING
  };
};

export const clearProfile = () => {
  return {
    type: actions.CLEAR_CURRENT_PROFILE
  };
};

export const deleteAccount = () => dispatch => {
  if (window.confirm("Are you sure? This can NOT be undone")) {
    axios
      .delete("/api/profile")
      .then(res => {
        dispatch({
          type: actions.SET_CURRENT_USER,
          payload: {}
        });
      })
      .catch(err => {
        dispatch({
          type: actions.GET_ERRORS,
          payload: err.response.data
        });
      });
  }
};

export const addExperience = (exp, history) => dispatch => {
  axios
    .post("/api/profile/experience", exp)
    .then(res => {
      history.push("/dashboard");
    })
    .catch(err => {
      dispatch({
        type: actions.GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const addEducation = (edu, history) => dispatch => {
  axios
    .post("/api/profile/education", edu)
    .then(res => {
      history.push("/dashboard");
    })
    .catch(err => {
      dispatch({
        type: actions.GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const deleteExperience = expId => dispatch => {
  axios
    .delete(`/api/profile/experience/${expId}`)
    .then(res => {
      dispatch({
        type: actions.GET_PROFILE,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: actions.GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const deleteEducation = eduId => dispatch => {
  axios
    .delete(`/api/profile/education/${eduId}`)
    .then(res => {
      dispatch({
        type: actions.GET_PROFILE,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: actions.GET_ERRORS,
        payload: err.response.data
      });
    });
};
