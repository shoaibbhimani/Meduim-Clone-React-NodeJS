import axios from "axios";

export const getLocalStorage = () => {
  return JSON.parse(localStorage.getItem("mediumcloneuser"));
};

export const deleteLocalStorage = () => {
  localStorage.removeItem("mediumcloneuser");
  setGlobalAxiosHeader("");
};

export const setLocalStorage = ({ user, jwt }) => {
  const data = JSON.stringify({
    user,
    jwt
  });

  localStorage.setItem("mediumcloneuser", data);
  setGlobalAxiosHeader(jwt);
};

export const setGlobalAxiosHeader = jwt => {
  axios.defaults.headers.common["Authorization"] = jwt;
};
