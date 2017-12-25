import { INCREMENT_LIKES, ADD_COMMENTS } from "../actions-types";

import * as APIClient from "../apiclient";
import * as TYPES from "../actions-types";
import * as UtilityMethod from "../UtilityMethod";

export const incrementLikes = ({ index }) => {
  return {
    type: INCREMENT_LIKES,
    index
  };
};

export const addComments = ({ index, text, userInfo }) => {
  return {
    type: ADD_COMMENTS,
    payload: {
      text,
      index,
      ...userInfo
    }
  };
};

export const getPost = () => {
  return dispatch => {
    APIClient.getPost()
      .then(({ data }) => {
        dispatch({ type: TYPES.POSTS, payload: data.posts });
      })
      .catch(error => {
        dispatch({ type: "ERROR", payload: error });
      });
  };
};

export const getUserData = (data, callback) => {
  return dispatch => {
    APIClient.googleAuth(data)
      .then(({ data }) => {
        dispatch(setUserData(data));
        callback();
      })
      .catch(error => {
        dispatch({ type: "ERROR", payload: error });
      });
  };
};

export const setUserData = data => ({ type: TYPES.USER_DATA, payload: data });
