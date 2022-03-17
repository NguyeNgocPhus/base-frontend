import { atom } from "recoil";

const defaultState = {
  data: [],
  message: "",
  state: "",
  loading: false,
};

export const stateMien = atom({
  key: "STATE-MIEN",
  default: {
    ...defaultState,
  },
});

export const stateKhuVuc = atom({
  key: "STATE-KHU-VUC",
  default: {
    ...defaultState,
  },
});

export const stateTinh = atom({
  key: "STATE-TINH",
  default: {
    ...defaultState,
  },
});

export const stateThuongHieu = atom({
  key: "STATE-THUONG-HIEU",
  default: {
    ...defaultState,
  },
});
export const stateNhaHang = atom({
  key: "STATE-NHA-HANG",
  default: {
    ...defaultState,
  },
});
export const stateNhaCungCap = atom({
  key: "STATE-NHA-CUNG_CAP",
  default: {
    ...defaultState,
  },
});
export const stateMatHang = atom({
  key: "STATE-MAT-HANG",
  default: {
    ...defaultState,
  },
});
