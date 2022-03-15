import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { Auth } from "../../service/auth";
import { signWithPoState } from "./share-state";

const useSignInWithPo = () => {
  const [signInWithPoData, setSignInWithPoData] =
    useRecoilState(signWithPoState);

  const request = (params) => {
    Auth.signInWithPoData(params);
  };
  useEffect(() => {
    return () => {
      Auth.signInWithPoData();
    };
  }, []);

  return [signInWithPoData, request, setSignInWithPoData];
};
export default useSignInWithPo;
