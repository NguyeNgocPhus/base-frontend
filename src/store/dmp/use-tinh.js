import { useEffect } from "react";
import { useRecoilState } from "recoil";
import DMP from "../../service/dmp";
import { stateTinh } from "./share-state";

const useTinh = () => {
  const [dataTinh, setDataTinh] = useRecoilState(stateTinh);

  const request = (params) => {
    DMP.getTinhAsync(params, setDataTinh);
  };
  useEffect(() => {
    return () => {
      DMP.cancelGetApiTinh();
    };
  }, []);
  return [dataTinh, request];
};
export default useTinh;
