import { REQUEST_STATE } from "../app-config/constants";

export const getUserInfo = () => {
  const userInfo = sessionStorage.getItem("USER_INFO");

  if (userInfo && userInfo.length) {
    return JSON.parse(userInfo);
  }
  return null;
};
export const saveUserInfoStore = (userInfo) => {
  if (userInfo) {
    sessionStorage.setItem("USER_INFO", JSON.stringify(userInfo));
  }
};

export const cancel = (source) => {
  return source && source.cancel && source.cancel(REQUEST_STATE.UNMOUNT);
};
