import { REQUEST_STATE } from "../../app-config/constants";
import { cancel } from "../../app-helper";
import { GET, getTokenSource } from "../fetch";

let source = null;

export const cancelGetMatHang = () => cancel(source);

export const apiGetMatHang = async (params) => {
  cancelGetMatHang();

  source = getTokenSource();

  try {
    const response = await GET("/DMP/MatHang", params, {
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
      data: response.data.result,
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
