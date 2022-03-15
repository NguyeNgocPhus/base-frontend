import { REQUEST_STATE } from "../../app-config/constants";
import { cancel } from "../../app-helper";
import { GET, getTokenSource } from "../fetch";

let source = null;
export const cancelApiGetMien = () => cancel(source);
export const apiGetMien = async (params) => {
  cancelApiGetMien();
  source = getTokenSource();

  try {
    const response = await GET("/DMP/Mien", params, {
      cancelToken: source.token,
    });

    return {
      data: response.data,
      message: "",
      state: REQUEST_STATE.SUCCESS,
      loading: false,
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
