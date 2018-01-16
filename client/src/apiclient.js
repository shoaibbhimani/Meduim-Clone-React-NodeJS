import axios from "axios";

export const googleAuth = params =>
  axios.post("/api/auth", {
    ...params
  });

export const getPost = () => axios.get("/api/blogs/myblog");

export const createPost = params =>
  axios.post("api/blogs", {
    ...params
  });

export const editPost = ({ postId, ...params }) => {
  return axios.put(`/api/blogs/myblog/` + postId, {
    ...params
  });
};

export const getAllPost = () => axios.get("/api/blogs/allblog");
