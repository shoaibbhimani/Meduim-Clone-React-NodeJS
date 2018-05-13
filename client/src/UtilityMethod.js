import axios from "axios";
import { NotificationManager } from "react-notifications";
import "react-notifications/lib/notifications.css";
export const toast = NotificationManager;

const encodeURI = window.encodeURIComponent;

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

/**
 * Remove Special Character !@#$%^&*()-+=
 * @param {string} value - List of Item you want to add item to.
 */

export const lowerCaseRemoveSpecialChar = value => {
  return encodeURI(value
    .toLowerCase()
    .trim()
    .replace(/[&-\/\\#,+()$~%.'":*?<>{} ]/g, ""));
};

/* Check whether it is allpost section */

export const isAllPostSection = ownProps =>
  ownProps.location.pathname.indexOf("/myblogs") === -1;