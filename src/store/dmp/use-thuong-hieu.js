import { useEffect } from "react";
import { useRecoilState } from "recoil";
import DMP from "../../service/dmp";
import { stateThuongHieu } from "./share-state";

const useThuongHieu = () => {
  const [dataThuongHieu, getDataThuongHieu] = useRecoilState(stateThuongHieu);

  const request = (params) => {
    DMP.getThuongHieuAsync(params, getDataThuongHieu);
  };
  useEffect(() => {
    return () => {
      DMP.cancelGetApiThuongHieu();
    };
  });
  return [dataThuongHieu, request];
};
export default useThuongHieu;
