import {
  INCREMENT_LIKES_POST,
  INCREMENT_LIKES_ALLPOST,
  ADD_COMMENTS
} from "../actions-types";

import * as UtilityMethod from "../UtilityMethod.js";
import * as APIClient from "../apiclient";
import * as TYPES from "../actions-types";

export const incrementLikesPost = ({ postIndex, postId, userId, isLiked }) => {
  return dispatch => {
    APIClient.inclikes({ postId })
      .then(() => {
        dispatch({
          type: INCREMENT_LIKES_POST,
          postIndex,
          userId,
          postId
        });
        const message = isLiked ? "Unliked" : "liked";
        UtilityMethod.toast.success(`Successfully ${message} this post`);
      })
      .catch(() => {
        UtilityMethod.toast.error("something wen't wrong", "error");
      });
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

//Modify User Data
export const editUserdata = (data, callback) => {
  return dispatch => {
    APIClient.editUserData(data)
      .then(({ data }) => {
        callback && callback({ data });
        UtilityMethod.toast.success(`Successfully Edited Setting`);
        dispatch({ type: TYPES.USER_DATA, payload: data });
      })
      .catch(error => {
        UtilityMethod.toast.error("something wen't wrong", "error");
        dispatch({ type: "ERROR", payload: error });
      });
  };
};

//Blogs
export const getPost = ({ tag }) => {
  return dispatch => {
    APIClient.getPost({ tag })
      .then(({ data }) => {
        dispatch({
          type: TYPES.POSTS,
          payload: { posts: data.posts, tags: data.tags }
        });
      })
      .catch(error => {
        dispatch({ type: "ERROR", payload: error });
      });
  };
};

export const getAllPost = ({ tag }) => {
  return dispatch => {
    APIClient.getAllPost({ tag })
      .then(({ data }) => {
        dispatch({
          type: TYPES.POSTS,
          payload: { posts: data.posts, tags: data.tags }
        });
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

//Comments
export const getComments = ({ blogId }) => {
  return dispatch => {
    APIClient.getCommentOfPost({
      blogId
    }).then(({ data }) => {
      dispatch({
        type: TYPES.LOAD_COMMENTS,
        payload: data
      });
    });
  };
};

export const createComment = ({ text, user, blogId }) => {
  //Send API request
  return dispatch => {
    APIClient.postComment({
      blogId,
      text
    })
      .then(() => {
        dispatch({
          type: TYPES.ADD_COMMENT,
          payload: {
            blog: blogId,
            commentText: text,
            user
          }
        });
      })
      .catch(() => {
        console.log("errrr");
      });
  };
};

export const editCreateComment = ({ text, commentId, blogId }) => {
  APIClient.editComment({
    text,
    commentId,
    blogId
  });

  return {
    type: TYPES.EDITCOMMENT,
    payload: {
      text,
      commentId
    }
  };
};

export const removeAllComments = () => {
  return {
    type: TYPES.DELETE_ALL_COMMENTS
  };
};
