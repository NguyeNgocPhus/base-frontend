import { REQUEST_STATE } from "../../app-config/constants";
import { cancel } from "../../app-helper";
import { GET, getTokenSource } from "../fetch";

let source = null;

export const cancelGetMyProfile = () => cancel(source);
export const apiGetMyProfile = async () => {
  const query = {};

  cancelGetMyProfile();

  source = getTokenSource();

  try {
    const response = await GET("/Identity/Account/MyProfile", query, {
      cancelToken: source.token,
    });

    return {
      data: response.data,
      loading: false,
      message: "",
      state: REQUEST_STATE.SUCCESS,
    };
  } catch (error) {
    return {
      data: {},
      loading: false,
      message: error.message,
      state: REQUEST_STATE.ERROR,
    };
  }
};
