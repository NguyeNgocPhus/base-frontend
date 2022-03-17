import { REQUEST_STATE } from "../../app-config/constants";
import { cancel } from "../../app-helper";
import { GET, getTokenSource } from "../fetch";

let source = null;

export const cancelGetApiTinh = () => cancel(source);
export const getApiTinh = async (params) => {
  cancelGetApiTinh(source);
  source = getTokenSource();

  try {
    const response = await GET("/DMP/Tinh", params, {
      cancelToken: source.token,
    });
    return {
      data: response.data,
      message: "",
      loading: false,
      state: REQUEST_STATE.SUCCESS,
    };
  } catch (error) {
    return {
      data: {},
      message: error.message,
      loading: false,
      state: REQUEST_STATE.ERROR,
    };
  }
};
