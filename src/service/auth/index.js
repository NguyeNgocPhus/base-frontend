import { REQUEST_STATE } from "../../app-config/constants";
import {
  apiGetMyProfile,
  cancelGetMyProfile,
} from "../../data-source/auth/my-profile";
import {
  apiSignInWithPo,
  cancelSignInWithPo,
} from "../../data-source/auth/po-sign-in";
import {
  ApiUserLogin,
  cancelApiUserLogin,
} from "../../data-source/auth/user-login";

export const Auth = {
  cancelApiUserLogin: cancelApiUserLogin,
  userLoginAsync: function (params, setUserInfoData) {
    setUserInfoData({
      state: REQUEST_STATE.REQUEST,
      loading: true,
      message: "",
    });

    ApiUserLogin(params).then((response) => {
      if (response && response.message !== REQUEST_STATE.UNMOUNT) {
        setUserInfoData(response);
      }
    });
  },

  cancelSiginWithPo: cancelSignInWithPo,
  signInWithPoData: function (params, setSignInWithPoData) {
    setSignInWithPoData({
      state: REQUEST_STATE.REQUEST,
      loading: true,
      message: "",
    });
    apiSignInWithPo(params).then((response) => {
      if (response && response.message !== REQUEST_STATE.UNMOUNT) {
        setSignInWithPoData(response);
      }
    });
  },

  cancelGetMyProfile: cancelGetMyProfile,
  getMyProfile: function (setMyProfile) {
    setMyProfile({
      state: REQUEST_STATE.REQUEST,
      loading: true,
      message: "",
    });
    apiGetMyProfile().then((response) => {
      setMyProfile(response);
    });
  },
};
