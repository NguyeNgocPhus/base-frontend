import { REQUEST_STATE } from "../../app-config/constants";
import { cancel } from "../../app-helper";
import { GET, getTokenSource } from "../fetch";

let source = null;
export const cancelGetApiThuongHieu = () => cancel(source);
export const getApiThuongHieu = async (params) => {
  cancelGetApiThuongHieu();
  source = getTokenSource();

  try {
    const response = await GET("/DMP/ThuongHieu", params, {
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
      message: "",
      loading: false,
      state: REQUEST_STATE.ERROR,
    };
  }
};
