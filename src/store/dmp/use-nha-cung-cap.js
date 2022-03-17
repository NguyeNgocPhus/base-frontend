import { useEffect } from "react";
import { useRecoilState } from "recoil";
import DMP from "../../service/dmp";
import { stateNhaCungCap } from "./share-state";

export const useNhaCungCap = () => {
  const [dataNhaCungCap, setNhaCungCapData] = useRecoilState(stateNhaCungCap);

  const request = function (params) {
    DMP.getNhaCungCapAsync(params, setNhaCungCapData);
  };

  // unmount;
  useEffect(() => {
    return () => {
      // reset data when unmount;
      DMP.cancelGetNhaCungCap();
    };
  }, []);

  return [dataNhaCungCap, request];
};
