import * as actions from "../actions/types";

const initialState = {
  isAuthenticated: false,
  user: {}
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default authReducer;
