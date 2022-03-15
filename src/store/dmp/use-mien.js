import { useEffect } from "react";
import { useRecoilState } from "recoil";
import DMP from "../../service/dmp";
import { stateMien } from "./share-state";

const useMien = () => {
  const [dataMien, setDataMien] = useRecoilState(stateMien);

  const request = (params) => {
    DMP.getMienAsync(params, setDataMien);
  };
  useEffect(() => {
    return () => {
      DMP.cancelGetMien();
    };
  });
  return [dataMien, request];
};
export default useMien;
