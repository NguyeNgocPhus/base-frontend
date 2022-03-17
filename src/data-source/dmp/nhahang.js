import { REQUEST_STATE } from "../../app-config/constants";
import { cancel } from "../../app-helper";
import { GET, getTokenSource } from "../fetch";

let source = null;
export const cancelGetApiNhaHang = () => cancel(source);
export const apiGetApiNhaHang = async (params) => {
  cancelGetApiNhaHang();
  source = getTokenSource();

  try {
    const response = await GET("/DMP/NhaHang", params, {
      cancelToken: source.token,
    });
    return {
      data: response.data,
      loading: true,
      state: REQUEST_STATE.SUCCESS,
      message: "",
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
