import axios from "axios";

export const googleAuth = params =>
  axios.post("/api/auth", {
    ...params
  });

export const getPost = ({ tag }) => axios.get(`/api/blogs/myblog`,{
    params: { tag }
  });

export const createPost = params =>
  axios.post("api/blogs", {
    ...params
  });

export const editPost = ({ postId, ...params }) => {
  return axios.put(`/api/blogs/myblog/` + postId, {
    ...params
  });
};

export const inclikes = ({ postId }) => {
  return axios.put(`/api/blogs/inclikes/` + postId);
};

export const getAllPost = ({ tag }) =>
  axios.get(`/api/blogs/allblog`, {
    params: { tag }
  });

//comments
export const getCommentOfPost = ({ blogId }) =>
  axios.get(`/api/blog/${blogId}/comment`);

export const postComment = ({ blogId, text }) =>
  axios.post(`/api/blog/${blogId}/comment`, {
    text
  });

export const editComment = ({ blogId, text, commentId }) =>
  axios.put(`/api/blog/${blogId}/${commentId}/comment`, {
    text
  });