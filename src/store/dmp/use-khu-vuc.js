import { useEffect } from "react";
import { useRecoilState } from "recoil";
import DMP from "../../service/dmp";
import { stateKhuVuc } from "./share-state";

const useKhuVuc = () => {
  const [dataKhuVuc, setDataKhuVuc] = useRecoilState(stateKhuVuc);

  const request = (params) => {
    DMP.getKhuVucAsync(params, setDataKhuVuc);
  };
  useEffect(() => {
    return () => {
      DMP.cancelGetApiKhuVuc();
    };
  });
  return [dataKhuVuc, request, setDataKhuVuc];
};
export default useKhuVuc;
