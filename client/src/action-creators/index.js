import { INCREMENT_LIKES_POST, INCREMENT_LIKES_ALLPOST, ADD_COMMENTS,  } from "../actions-types";

import * as APIClient from "../apiclient";
import * as TYPES from "../actions-types";

export const incrementLikesPost = ({ index, postId }) => {
  APIClient.inclikes({ postId })
    
  return {
    type: INCREMENT_LIKES_POST,
    index
  };
};

export const incrementLikesAllPost = ({ index, postId  }) => {
  APIClient.inclikes({ postId })
 return {
   type: INCREMENT_LIKES_ALLPOST,
   index
 }
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

//Auth
export const getUserData = (data, callback) => {
  return dispatch => {
    APIClient.googleAuth(data)
      .then(({ data }) => {
        dispatch({ type: TYPES.USER_DATA, payload: data });
        callback();
      })
      .catch(error => {
        dispatch({ type: "ERROR", payload: error });
      });
  };
};

export const forgetUser = () => ({ type: TYPES.FORGOT_USER });

export const setUserData = data => ({ type: TYPES.USER_DATA, payload: data });

//Blogs
export const getPost = () => {
  return dispatch => {
    APIClient.getPost()
      .then(({ data }) => {
        dispatch({ type: TYPES.POSTS, payload: data });
      })
      .catch(error => {
        dispatch({ type: "ERROR", payload: error });
      });
  };
};

export const getAllPost = () => {
  return dispatch => {
    APIClient.getAllPost()
      .then(({ data }) => {
        dispatch({ type: TYPES.ALL_POST, payload: data.posts });
      })
      .catch(error => {
        dispatch({ type: "ERROR", payload: error });
      });
  };
};

export const createPost = (data, callback) => {
  return dispatch => {
    APIClient.createPost(data).then(() => {
      callback();
    });
  };
};

export const editPost = ({ data, index, postId }, callback) => {
  return dispatch => {
    APIClient.editPost({
      title: data.title,
      thumbnail: data.thumbnail,
      body: data.body,
      postId
    }).then(() => {
      dispatch({
        type: TYPES.EDITPOST,
        payload: { data, index }
      });

      callback();
    });
  };
};
