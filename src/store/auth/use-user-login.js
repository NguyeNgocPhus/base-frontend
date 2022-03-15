import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { Auth } from "../../service/auth";
import { userInfoState } from "./share-state";

export function useUserLogin() {
  const [userLoginData, setUserLoginData] = useRecoilState(userInfoState);
  const request = (params) => {
    Auth.userLoginAsync(params, setUserLoginData);
  };
  useEffect(() => {
    Auth.cancelApiUserLogin();
  }, []);

  return [userLoginData, request, setUserLoginData];
}
