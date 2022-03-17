import { GET, getTokenSource } from "../fetch";
import { REQUEST_STATE } from "../../app-config/constants";
import { cancel } from "../../app-helper/index";
let source = null;

export const cancelGetNhaCungCap = () => cancel(source);

export const apiGetNhaCungCap = async (params) => {
  cancelGetNhaCungCap();

  source = getTokenSource();

  try {
    const response = await GET("/DMP/NhaCungCap", params, {
      cancelToken: source.token,
    });

    if (response && response.error) {
      return {
        data: [],
        state: REQUEST_STATE.ERROR,
        message: response.error.message,
        loading: false,
      };
    }

    return {
      data: response.data,
      state: REQUEST_STATE.SUCCESS,
      message: "",
      loading: false,
    };
  } catch (error) {
    return {
      data: [],
      state: REQUEST_STATE.ERROR,
      message: error.message,
      loading: false,
    };
  }
};
