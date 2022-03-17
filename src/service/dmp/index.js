import { REQUEST_STATE } from "../../app-config/constants";
import { getApiKhuVuc, cancelGetApiKhuVuc } from "../../data-source/dmp/khuvuc";
import { apiGetMatHang, cancelGetMatHang } from "../../data-source/dmp/mathang";
import { apiGetMien, cancelApiGetMien } from "../../data-source/dmp/mien";
import {
  apiGetNhaCungCap,
  cancelGetNhaCungCap,
} from "../../data-source/dmp/nhacungcap";
import {
  apiGetApiNhaHang,
  cancelGetApiNhaHang,
} from "../../data-source/dmp/nhahang";
import {
  getApiThuongHieu,
  cancelGetApiThuongHieu,
} from "../../data-source/dmp/thuonghieu";
import { getApiTinh, cancelGetApiTinh } from "../../data-source/dmp/tinh";

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
  cancelGetApiTinh: cancelGetApiTinh,
  getTinhAsync: function (params, setDataTinh) {
    setDataTinh({
      data: {},
      message: "",
      loading: true,
      state: REQUEST_STATE.REQUEST,
    });
    getApiTinh(params).then((response) => {
      if (response && response.state !== REQUEST_STATE.UNMOUNT) {
        setDataTinh(response);
      }
    });
  },
  cancelGetApiThuongHieu: cancelGetApiThuongHieu,
  getThuongHieuAsync: function (params, setDataThuongHieu) {
    setDataThuongHieu({
      data: {},
      message: "",
      loading: true,
      state: REQUEST_STATE.REQUEST,
    });
    getApiThuongHieu(params).then((response) => {
      if (response && response.state !== REQUEST_STATE.UNMOUNT) {
        setDataThuongHieu(response);
      }
    });
  },
  cancelGetApiNhaHang: cancelGetApiNhaHang,
  getNhaHangAsync: function (params, setDataNhaHang) {
    setDataNhaHang({
      data: {},
      message: "",
      loading: true,
      state: REQUEST_STATE.REQUEST,
    });
    apiGetApiNhaHang(params).then((response) => {
      if (response && response.state !== REQUEST_STATE.UNMOUNT) {
        setDataNhaHang(response);
      }
    });
  },
  cancelGetNhaCungCap: cancelGetNhaCungCap,
  getNhaCungCapAsync: function (params, setNhaCungCapData) {
    setNhaCungCapData({
      state: REQUEST_STATE.REQUEST,
      message: "",
      loading: true,
    });

    apiGetNhaCungCap(params).then((response) => {
      if (response && response.message !== REQUEST_STATE.UNMOUNT) {
        setNhaCungCapData(response);
      }
    });
  },
  cancelGetMatHang: cancelGetMatHang,
  getMatHangAsync: function (params, setMatHangData) {
    setMatHangData({
      state: REQUEST_STATE.REQUEST,
      message: "",
      loading: true,
    });

    apiGetMatHang(params).then((response) => {
      if (response && response.message !== REQUEST_STATE.UNMOUNT) {
        setMatHangData(response);
      }
    });
  },
};
export default DMP;
