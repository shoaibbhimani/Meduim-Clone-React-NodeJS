import axios from "axios";

export const googleAuth = params =>
  axios.post("/api/auth", {
    ...params
  });

export const getPost = () => axios.get("/api/blogs");

export const createPost = (params) => axios.post("api/blogs", {
    ...params
});
