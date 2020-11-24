import axios from "axios";
import { API_ENDPOINT } from "../constants";

export const isAuthenticated = () => {
  if (
    !localStorage.getItem("token") ||
    localStorage.getItem("token") === "undefined"
  ) {
    return false;
  }
  return true;
};

export const login = (values) => {
  axios
    .post(`${API_ENDPOINT}/api/auth`, values)
    .then((res) => {
      if (res.data.accessToken) {
        localStorage.setItem("token", res.data.accessToken);
      } else {
        throw new Error("Authentication failed");
      }
    })
    .catch((err) => {
      console.err(err);
    });
};

export const logout = () => {
  localStorage.setItem("token", undefined);
};
