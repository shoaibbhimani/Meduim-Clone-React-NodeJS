import axios from "axios";

export const googleAuth = params =>
  axios.post("/api/auth", {
    ...params
  });

export const getPost = () => axios.get("/api/blogs");
