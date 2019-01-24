import axios from "axios";
import * as actions from "./types";

export const addPost = postData => dispatch => {
  axios
    .post("/api/posts", postData)
    .then(res => {
      dispatch({
        type: actions.ADD_POST,
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

export const getPosts = () => dispatch => {
  dispatch(setPostLoading());
  axios
    .get("/api/posts")
    .then(res => {
      dispatch({
        type: actions.GET_POSTS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: actions.GET_POSTS,
        payload: []
      });
    });
};

export const getPost = postId => dispatch => {
  dispatch(setPostLoading());
  axios
    .get(`/api/posts/${postId}`)
    .then(res => {
      dispatch({
        type: actions.GET_POST,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: actions.GET_POST,
        payload: null
      });
    });
};

export const likePost = postId => dispatch => {
  axios
    .post(`/api/posts/like/${postId}`)
    .then(res => {
      dispatch(getPosts());
    })
    .catch(err => {
      dispatch({
        type: actions.GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const unlikePost = postId => dispatch => {
  axios
    .delete(`/api/posts/like/${postId}`)
    .then(res => {
      dispatch(getPosts());
    })
    .catch(err => {
      dispatch({
        type: actions.GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const deletePost = postId => dispatch => {
  axios
    .delete(`/api/posts/${postId}`)
    .then(res => {
      dispatch({
        type: actions.DELETE_POST,
        payload: postId
      });
    })
    .catch(err => {
      dispatch({
        type: actions.GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const addComment = (data, postId) => dispatch => {
  axios
    .post(`/api/posts/comment/${postId}`, data)
    .then(res => {
      dispatch({
        type: actions.GET_POST,
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

export const setPostLoading = () => {
  return {
    type: actions.POST_LOADING
  };
};
