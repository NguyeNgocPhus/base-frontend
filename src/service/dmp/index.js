import { REQUEST_STATE } from "../../app-config/constants";
import { getApiKhuVuc, cancelGetApiKhuVuc } from "../../data-source/dmp/khuvuc";
import { apiGetMien, cancelApiGetMien } from "../../data-source/dmp/mien";

const DMP = {
  cancelGetMien: cancelApiGetMien,
  getMienAsync: function (params, setDataMien) {
    setDataMien({
      data: {},
      message: "",
      loading: true,
      state: REQUEST_STATE.REQUEST,
    });
    apiGetMien(params).then((response) => {
      if (response && response.state !== REQUEST_STATE.UNMOUNT) {
        setDataMien(response);
      }
    });
  },

  cancelGetApiKhuVuc: cancelGetApiKhuVuc,
  getKhuVucAsync: function (params, setDataKhuVuc) {
    setDataKhuVuc({
      data: {},
      message: "",
      loading: true,
      state: REQUEST_STATE.REQUEST,
    });
    getApiKhuVuc(params).then((response) => {
      if (response && response.state !== REQUEST_STATE.UNMOUNT) {
        setDataKhuVuc(response);
      }
    });
  },
};
export default DMP;
