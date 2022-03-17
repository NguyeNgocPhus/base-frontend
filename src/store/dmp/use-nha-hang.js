import { useEffect } from "react";
import { useRecoilState } from "recoil";
import DMP from "../../service/dmp";
import { stateNhaHang } from "./share-state";

const useNhaHang = () => {
  const [dataNhaHang, setDataNhahang] = useRecoilState(stateNhaHang);

  const request = (params) => {
    DMP.getNhaHangAsync(params, setDataNhahang);
  };
  useEffect(() => {
    return () => {
      DMP.cancelGetApiNhaHang();
    };
  });
  return [dataNhaHang, request];
};
export default useNhaHang;
