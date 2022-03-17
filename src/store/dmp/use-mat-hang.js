import { useEffect } from "react";
import { useRecoilState } from "recoil";
import DMP from "../../service/dmp";
import { stateMatHang } from "./share-state";

export const useMatHang = () => {
  const [dataMatHang, setMatHangData] = useRecoilState(stateMatHang);

  const request = function (params) {
    DMP.getMatHangAsync(params, setMatHangData);
  };

  // unmount;
  useEffect(() => {
    return () => {
      // reset data when unmount;
      DMP.cancelGetMatHang();
    };
  }, []);

  return [dataMatHang, request];
};
