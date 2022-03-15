import { REQUEST_STATE } from "../../app-config/constants";
import { cancel } from "../../app-helper";
import { getTokenSource, POST } from "../fetch";
let source = null;

export const cancelApiUserLogin = () => cancel(source);
export const ApiUserLogin = async (params) => {
  const query = {
    userName: params.userName,
    password: params.password,
  };
  cancelApiUserLogin();
  source = getTokenSource();

  try {
    const response = await POST(
      "/Identity/Account/SignInWithUserName",
      query,
      {}
    );

    if (response.errors) {
      const { errors } = response;

      return {
        token: "",
        state: REQUEST_STATE.ERROR,
        message: errors && errors.length ? errors[0].error : "",
        loading: false,
      };
    }
    return {
      token: response.data.token,
      state: REQUEST_STATE.SUCCESS,
      message: "",
      loading: false,
    };
  } catch (error) {
    return {
      token: "",
      state: REQUEST_STATE.ERROR,
      message: error.message,
      loading: false,
    };
  }
};
