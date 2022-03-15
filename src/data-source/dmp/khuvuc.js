import { REQUEST_STATE } from "../../app-config/constants";
import { cancel } from "../../app-helper";
import { GET, getTokenSource } from "../fetch";

let source = null;

export const cancelGetApiKhuVuc = () => cancel(source);
export const getApiKhuVuc = async (params) => {
  cancelGetApiKhuVuc();

  source = getTokenSource();

  try {
    const response = await GET("/DMP/KhuVuc", params, {
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
      message: error,
      loading: false,
      state: REQUEST_STATE.ERROR,
    };
  }
};
